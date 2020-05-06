import { createStore, combineReducers, applyMiddleware } from 'redux'
import { firebaseReducer, IFirebaseState} from './states/firebase'
import { userReducer, IUserState} from './states/user'
import { epicMiddleware, rootEpic} from './epics/epics'
import { createLogger } from 'redux-logger'

export type AppState = {
  firebase: IFirebaseState
  user: IUserState
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