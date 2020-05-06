import { Success } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { firebaseActions, IWork } from '../actions/actions';

export interface IWorkState extends IWork {
    thumbnailURL: string
    imageURLs: string[]
}

export interface IFirebaseState {
    isLoading: boolean
    works: IWorkState[]
}

const initialFirebaseState: IFirebaseState = {
    isLoading: false,
    works: [{
        title: "",
        skills: [],
        description: "",
        year: "",
        thumbnail: "",
        thumbnailURL: "",
        images: [],
        imageURLs: [],
    }]
};

export const firebaseReducer = reducerWithInitialState(initialFirebaseState)
    .case(firebaseActions.getWorks.started, (state: IFirebaseState) => {
        return Object.assign({}, state, { isLoading: true });
    })
    .case(firebaseActions.getWorks.done, (state: IFirebaseState, success: Success<void, IWork[]>) => {
        return Object.assign({}, state, { works: success.result });
    })
    .case(firebaseActions.getThumbnail.done, (state: IFirebaseState, success: Success<string, string>) => {
        let stateTmp = Object.assign(state);
        stateTmp.isLoading = false;
        stateTmp.works
            .filter((work: IWorkState) => work.thumbnail === success.params)
            .map((work: IWorkState) => work.thumbnailURL = success.result)

        return Object.assign({}, state, { stateTmp });
    })
    .case(firebaseActions.getDetailImages.done, (state: IFirebaseState, success: Success<IWorkState | null, string[]>) => {
        if (success.params !== null) {
            const title = success.params.title
            let stateTmp = Object.assign(state);
            stateTmp.works
                .filter((work: IWorkState) => work.title === title)
                .map((work: IWorkState) => work.imageURLs = success.result)

            return Object.assign({}, state, { stateTmp });
        }
        return Object.assign({}, state);
    })


