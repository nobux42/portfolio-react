
import { AnyAction, Action, Success } from 'typescript-fsa';
import 'rxjs';
import { map, mergeMap } from "rxjs/operators";
import { combineEpics, Epic, createEpicMiddleware, ofType } from 'redux-observable';
import { firebaseActions, IWork } from '../actions/actions'
import firestore from '../firebase';

const firebaseGetWorksEpic: Epic<AnyAction> =
    action$ => 
        action$.pipe(
            ofType(firebaseActions.getWorks.started.type),
            mergeMap((param) => {
                return firestore.collection('Works').get().then((snapshot) => {
                    const works: IWork[] = []
                    snapshot.forEach((doc) => {
                        works.push({
                            title: doc.data().title,
                            skills: []
                        })
                    })
                    return firebaseActions.getWorks.done({ result: works })
                })
                // ,map((param) => {
                //     console.log("epic: ", param)
                //     return hogeActions.updateNameComplete("")
                // })
            })
        )

export const rootEpic = combineEpics(
    firebaseGetWorksEpic,
);

export const epicMiddleware = createEpicMiddleware();