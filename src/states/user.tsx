import { Success } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { userActions, IWorkItemHover } from '../actions/actions';
import { IWorkItemState } from './work';

export interface IUserState {
    workHover: IWorkItemHover;
    selectedWork: IWorkItemState | null;
}
  
const initialUserState: IUserState = {
    workHover: { 
        hovered: false,
        workItem: null,
    },
    selectedWork: null
};

export const userReducer = reducerWithInitialState(initialUserState)
  .case(userActions.hoverWork, (state: IUserState, workHover: IWorkItemHover) => {
    return Object.assign({}, state, { workHover: workHover });
  })
  .case(userActions.selecteWork, (state: IUserState, work: IWorkItemState | null) => {
    return Object.assign({}, state, { selectedWork: work });
  })
  