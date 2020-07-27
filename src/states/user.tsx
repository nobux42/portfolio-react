import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { userActions } from '../actions/actions';
import { IWorkItemState } from './work';

export interface IUserState {
    hoveredWorkItem: IWorkItemState | null;
    selectedWorkItem: IWorkItemState | null;
}

const initialUserState: IUserState = {
    hoveredWorkItem: null,
    selectedWorkItem: null
};

export const userReducer = reducerWithInitialState(initialUserState)
  .case(userActions.hoverWork, (state: IUserState, workItem: IWorkItemState | null) => {
    return Object.assign({}, state, { hoveredWorkItem: workItem });
  })
  .case(userActions.selecteWork, (state: IUserState, workItem: IWorkItemState | null) => {
    return Object.assign({}, state, { selectedWorkItem: workItem });
  })
  