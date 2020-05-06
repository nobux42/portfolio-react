import { createStore, combineReducers, applyMiddleware } from 'redux'
import { firebaseReducer, FirebaseState} from './states/firebase'
import { userReducer, UserState} from './states/user'
import { epicMiddleware, rootEpic} from './epics/epics'
import { createLogger } from 'redux-logger'

export type AppState = {
  firebase: FirebaseState
  user: UserState
};

export default function configureStore() {
    const store = createStore(
        combineReducers<AppState>({
            firebase: firebaseReducer,
            user: userReducer,
        }),
        applyMiddleware(
            epicMiddleware,
            createLogger({ level: "info" })
        )
    );
    epicMiddleware.run(rootEpic);

    return store;
}