import { createStore, combineReducers, applyMiddleware } from 'redux'
import { authReducer, IAuthState} from './states/auth'
import { workReducer, IWrokState} from './states/work'
import { userReducer, IUserState} from './states/user'
import { epicMiddleware, rootEpic} from './epics/epics'
import { createLogger } from 'redux-logger'

export type AppState = {
    auth: IAuthState
    work: IWrokState
    user: IUserState
};

export default function configureStore() {
    const store = createStore(
        combineReducers<AppState>({
            auth: authReducer,
            work: workReducer,
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