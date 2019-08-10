
import { AnyAction, Action } from 'typescript-fsa';
import 'rxjs';
import { map } from "rxjs/operators";
import { combineEpics, Epic, createEpicMiddleware, ofType, ActionsObservable } from 'redux-observable';


import { hogeActions } from '../actions/actions'
import { HogeState } from '../states/states' 

const loggingEpic: Epic<Action<string>> =
    action$ => 
        action$.pipe(
            ofType(hogeActions.updateName.type),
            map((param) => {
                console.log("epic: ", param)
                return hogeActions.updateNameComplete("")
            })
        )

export const rootEpic = combineEpics(
    loggingEpic,
);

export const epicMiddleware = createEpicMiddleware<Action<string>, Action<string>, HogeState>();