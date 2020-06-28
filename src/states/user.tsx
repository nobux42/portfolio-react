import { Success } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { userActions, IWorkHover } from '../actions/actions';
import { IWorkState } from './work';

export interface IUserState {
    workHover: IWorkHover;
    selectedWork: IWorkState | null;
}
  
const initialUserState: IUserState = {
    workHover: { 
        hovered: false,
        work: null,
    },
    selectedWork: null
};

export const userReducer = reducerWithInitialState(initialUserState)
  .case(userActions.hoverWork, (state: IUserState, workHover: IWorkHover) => {
    return Object.assign({}, state, { workHover: workHover });
  })
  .case(userActions.selecteWork, (state: IUserState, work: IWorkState | null) => {
    return Object.assign({}, state, { selectedWork: work });
  })
  