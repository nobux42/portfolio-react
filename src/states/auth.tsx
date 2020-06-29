import { Success } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { authActions } from '../actions/actions';
import { IWorkItemState } from './work';

export interface IAuthState {
    user: firebase.User | null
}
  
const initialAuthState: IAuthState = {
    user: null
};

export const authReducer = reducerWithInitialState(initialAuthState)
    .case(authActions.setUser, (state: IAuthState, user: firebase.User) => {
        return Object.assign({}, state, { user: user });
    })
  