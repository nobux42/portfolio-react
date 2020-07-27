
import { Action, Success } from 'typescript-fsa';
import { of, defer, forkJoin, ObservableInput } from 'rxjs';
import { map, mergeMap, flatMap } from "rxjs/operators";
import { combineEpics, Epic, createEpicMiddleware, ofType } from 'redux-observable';
import { authActions, workActions, IWorkItem } from '../actions/actions'
import { firestore, storage } from '../firebase';
import { IWorkItemState } from '../states/work';
import { push } from 'connected-react-router';

const setUserEpic: Epic = 
    actions$ => 
        actions$.pipe(
            ofType(authActions.setUser.type),
            mergeMap((action: Action<firebase.User>) => {
                if (action.payload) {
                    return [push('/'), workActions.getWorks.started()]
                }
                return [workActions.getWorks.started()]
            })
        )

const getWorksStartedEpic: Epic =
    (action$, state$) => 
        action$.pipe(
            ofType(workActions.getWorks.started.type),
            mergeMap((action: Action<void>, s) => {
                if (state$.value.auth.user) {
                    return firestore.collection('Works').orderBy("year", "desc").get() 
                } else {
                    return firestore.collection('Works').where("isPrivate", "==", false).orderBy("year", "desc").get()
                }
            }),
            map((snapshot) => {
                const works: IWorkItem[] = []
                snapshot.forEach((doc) => {
                    works.push({
                        title: doc.data().title,
                        skills: doc.data().skills,
                        description: doc.data().description ? doc.data().description : "",
                        year: doc.data().year,
                        thumbnail: doc.data().thumbnail,
                        images: doc.data().images,
                    })
                })
                return workActions.getWorks.done({ result: works })
            })
        )

const getWorksDoneEpic: Epic =
    action$ => 
        action$.pipe(
            ofType(workActions.getWorks.done.type),
            flatMap((action: Action<Success<void, IWorkItem[]>>) => {
                return action.payload.result
            }),
            map((work: IWorkItem) => {
                return workActions.getThumbnail.started(work.thumbnail)
            })
        )

const getThumbnailStartedEpic: Epic =
    action$ => 
        action$.pipe(
            ofType(workActions.getThumbnail.started.type),
            mergeMap((action: Action<string>) => forkJoin(
                of(action),
                defer(() => { 
                    let spaceRef = storage.ref().child(action.payload)
                    return spaceRef.getDownloadURL()
                })
            )),
            map(([action, url]: [any, any]) => {
                return workActions.getThumbnail.done({ params: action.payload, result: url })
            })
        )

const getDetailImagesStartedEpic: Epic =
    action$ => 
        action$.pipe(
            ofType(workActions.getDetailImages.started.type),
            mergeMap((action: Action<IWorkItemState | null>) => forkJoin(
                of(action),
                defer(() => { 
                    if(action.payload != null) {
                        let defers: ObservableInput<any>[] = []
                        for(var image of action.payload.images) {
                            let spaceRef = storage.ref().child(image)
                            let defer = spaceRef.getDownloadURL()
                            defers.push(defer)
                        }
                        return forkJoin(...defers)
                    }
                    return []
                })
            )),
            map(([action, images]: [Action<IWorkItemState | null>, string[]]) => {
                console.log("userGetDetailImages:", images)
                return workActions.getDetailImages.done({ params: action.payload, result: images })
            })
        )




export const rootEpic = combineEpics(
    setUserEpic,
    getWorksStartedEpic,
    getWorksDoneEpic,
    getThumbnailStartedEpic,
    getDetailImagesStartedEpic,
);

export const epicMiddleware = createEpicMiddleware();