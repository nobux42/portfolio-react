import { createStore, combineReducers, applyMiddleware } from 'redux';
import { hogeReducer, HogeState } from './states/states';
import { epicMiddleware, rootEpic} from './epics/epics'

export type AppState = {
  hoge: HogeState
};

export default function configureStore() {
    const store = createStore(
        combineReducers<AppState>({
            hoge: hogeReducer
        }),
        applyMiddleware(epicMiddleware)
    );
    epicMiddleware.run(rootEpic);

    return store;
}