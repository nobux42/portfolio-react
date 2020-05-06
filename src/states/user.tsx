import { Success } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { firebaseActions, userActions, IWork, WorkHover } from '../actions/actions';
import { IWorkState } from './firebase';

export interface UserState {
    workHover: WorkHover;
    selectedWork: IWorkState | null;
}
  
const initialUserState: UserState = {
    workHover: { 
        hovered: false,
        work: null,
    },
    selectedWork: null
};  

export const userReducer = reducerWithInitialState(initialUserState)
  .case(userActions.hoverWork, (state: UserState, workHover: WorkHover) => {
    return Object.assign({}, state, { workHover: workHover });
  })
  .case(userActions.selecteWork, (state: UserState, work: IWorkState | null) => {
    return Object.assign({}, state, { selectedWork: work });
  })
  