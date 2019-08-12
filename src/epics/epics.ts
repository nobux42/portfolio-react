
import { AnyAction, Action, Success } from 'typescript-fsa';
import { from, of, defer, forkJoin } from 'rxjs';
import { map, mergeMap, flatMap } from "rxjs/operators";
import { combineEpics, Epic, createEpicMiddleware, ofType } from 'redux-observable';
import { firebaseActions, IWork } from '../actions/actions'
import { firestore, storage } from '../firebase';

const firebaseGetWorksEpic: Epic =
    action$ => 
        action$.pipe(
            ofType(firebaseActions.getWorks.started.type),
            mergeMap((action: Action<void>) => {
                return firestore.collection('Works').get()
            }),
            map((snapshot) => {
                const works: IWork[] = []
                snapshot.forEach((doc) => {
                    works.push({
                        title: doc.data().title,
                        skills: doc.data().skills,
                        thumbnail: doc.data().thumbnail
                    })
                })
                return firebaseActions.getWorks.done({ result: works })
            })
        )

const firebaseGetWorksDoneEpic: Epic =
    action$ => 
        action$.pipe(
            ofType(firebaseActions.getWorks.done.type),
            flatMap((action: Action<Success<void, IWork[]>>) => {
                console.log("action: ", action);
                return action.payload.result
            }),
            map((work: IWork) => {
                console.log("thumbnail: ", work)
                return firebaseActions.getThumbnail.started(work.thumbnail)
            })
        )

const firebaseGetThumbnailEpic: Epic =
    action$ => 
        action$.pipe(
            ofType(firebaseActions.getThumbnail.started.type),
            mergeMap((action: Action<string>) => forkJoin(
                of(action),
                defer(() => { 
                    console.log("spaceRef: ", action)
                    let spaceRef = storage.ref().child(action.payload)
                    return spaceRef.getDownloadURL()
                })
            )),
            map(([action, url]: [any, any]) => {
                console.log("url: ", action, url)
                return firebaseActions.getThumbnail.done({ params: action.payload, result: url })
            })
        )

export const rootEpic = combineEpics(
    firebaseGetWorksEpic,
    firebaseGetWorksDoneEpic,
    firebaseGetThumbnailEpic,
);

export const epicMiddleware = createEpicMiddleware();