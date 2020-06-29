import { createStore, combineReducers, applyMiddleware, Reducer } from 'redux'
import { authReducer, IAuthState} from './states/auth'
import { workReducer, IWrokState} from './states/work'
import { userReducer, IUserState} from './states/user'
import { epicMiddleware, rootEpic} from './epics/epics'
import { createLogger } from 'redux-logger'
import { routerMiddleware, connectRouter } from 'connected-react-router';
import history from './history'

export type AppState = {
    auth: IAuthState
    work: IWrokState
    user: IUserState
    router: any
};

export default function configureStore() {
    const store = createStore(
        combineReducers<AppState>({
            auth: authReducer,
            work: workReducer,
            user: userReducer,
            router: connectRouter(history),
        }),
        applyMiddleware(
            routerMiddleware(history),
            epicMiddleware,            
            createLogger({ level: "info" })
        )
    );
    epicMiddleware.run(rootEpic);
    return store;
}