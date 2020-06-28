import { Success } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { workActions, IWorkItem } from '../actions/actions';

export interface IWorkItemState extends IWorkItem {
    thumbnailURL: string
    imageURLs: string[]
}

export interface IWrokState {
    isLoading: boolean
    workItems: IWorkItemState[]
}

const initialWorkState: IWrokState = {
    isLoading: false,
    workItems: [{
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

export const workReducer = reducerWithInitialState(initialWorkState)
    .case(workActions.getWorks.started, (state: IWrokState) => {
        return Object.assign({}, state, { isLoading: true });
    })
    .case(workActions.getWorks.done, (state: IWrokState, success: Success<void, IWorkItem[]>) => {
        return Object.assign({}, state, { workItems: success.result });
    })
    .case(workActions.getThumbnail.done, (state: IWrokState, success: Success<string, string>) => {
        let stateTmp = Object.assign(state);
        stateTmp.isLoading = false;
        stateTmp.workItems
            .filter((workItem: IWorkItemState) => workItem.thumbnail === success.params)
            .map((workItem: IWorkItemState) => workItem.thumbnailURL = success.result)

        return Object.assign({}, state, { stateTmp });
    })
    .case(workActions.getDetailImages.done, (state: IWrokState, success: Success<IWorkItemState | null, string[]>) => {
        if (success.params !== null) {
            const title = success.params.title
            let stateTmp = Object.assign(state);
            stateTmp.workItems
                .filter((work: IWorkItemState) => work.title === title)
                .map((work: IWorkItemState) => work.imageURLs = success.result)

            return Object.assign({}, state, { stateTmp });
        }
        return Object.assign({}, state);
    })


