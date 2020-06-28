
import { Action, Success } from 'typescript-fsa';
import { of, defer, forkJoin, ObservableInput } from 'rxjs';
import { map, mergeMap, flatMap } from "rxjs/operators";
import { combineEpics, Epic, createEpicMiddleware, ofType } from 'redux-observable';
import { workActions, IWork } from '../actions/actions'
import { firestore, storage } from '../firebase';
import { IWorkState } from '../states/work';


const firebaseGetWorksEpic: Epic =
    action$ => 
        action$.pipe(
            ofType(workActions.getWorks.started.type),
            mergeMap((action: Action<void>) => {
                return firestore.collection('Works').orderBy("year", "desc").get()
            }),
            map((snapshot) => {
                const works: IWork[] = []
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

const firebaseGetWorksDoneEpic: Epic =
    action$ => 
        action$.pipe(
            ofType(workActions.getWorks.done.type),
            flatMap((action: Action<Success<void, IWork[]>>) => {
                return action.payload.result
            }),
            map((work: IWork) => {
                return workActions.getThumbnail.started(work.thumbnail)
            })
        )

const firebaseGetThumbnailEpic: Epic =
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

// const userGetDetailImages: Epic =
//         action$ => 
//             action$.pipe(
//                 ofType(userActions.getDetailImages.started.type),
//                 flatMap((action: Action<IWorkState | null>) => {
//                     console.log("userGetDetailImages flatMap:", action)
//                     if( action.payload) {
//                         return action.payload.images
//                     } else {
//                         return [""]
//                     }
//                 }),
//                 mergeMap((imageName: string) => {
//                     console.log("userGetDetailImages mergeMap:", imageName)
//                     let spaceRef = storage.ref().child(imageName)
//                     return spaceRef.getDownloadURL()
//                 }),
//                 toArray(),
//                 map((resutl: string[]) => {
//                     console.log("userGetDetailImages:", resutl)
//                     return userActions.getDetailImages.done({ params: null, result: resutl })
//                 })
//             )
const userGetDetailImages: Epic =
    action$ => 
        action$.pipe(
            ofType(workActions.getDetailImages.started.type),
            mergeMap((action: Action<IWorkState | null>) => forkJoin(
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
            map(([action, images]: [Action<IWorkState | null>, string[]]) => {
                console.log("userGetDetailImages:", images)
                return workActions.getDetailImages.done({ params: action.payload, result: images })
            })
        )
    
            


export const rootEpic = combineEpics(
    firebaseGetWorksEpic,
    firebaseGetWorksDoneEpic,
    firebaseGetThumbnailEpic,
    userGetDetailImages,
);

export const epicMiddleware = createEpicMiddleware();