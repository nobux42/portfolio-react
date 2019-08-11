import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { firebaseActions, userActions, IWork } from '../actions/actions';

export interface FirebaseState {
  works: IWork[];
}

const initialFirebaseState: FirebaseState = {
  works: [{title: "sample", skills:[]}],
};

export interface UserState {
  hoveredWork: IWork | null;
}

const initialUserState: UserState = {
  hoveredWork: null
};

export const firebaseReducer = reducerWithInitialState(initialFirebaseState)
  .case(firebaseActions.getWorks.done, (state, param) => {
    return Object.assign({}, state, { works: param.result });
  });

export const userReducer = reducerWithInitialState(initialUserState)
  .case(userActions.hoverWork, (state, work) => {
    return Object.assign({}, state, { hoveredWork: work });
  });
