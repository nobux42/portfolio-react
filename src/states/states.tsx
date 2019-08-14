import { Success } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { firebaseActions, userActions, IWork, WorkHover } from '../actions/actions';

export interface IWorkState extends IWork{
  thumbnailURL: string
}

export interface FirebaseState {
  works: IWorkState[];
}

const initialFirebaseState: FirebaseState = {
  works: [{
    title: "", 
    skills:[], 
    thumbnail: "", 
    thumbnailURL: ""}],
};

export interface UserState {
  workHover: WorkHover;
}

const initialUserState: UserState = {
  workHover: { 
    hovered: false,
    work: null,
  }
};

export const firebaseReducer = reducerWithInitialState(initialFirebaseState)
  .case(firebaseActions.getWorks.done, (state: FirebaseState, success: Success<void, IWork[]>) => {
    return Object.assign({}, state, { works: success.result });
  })
  .case(firebaseActions.getThumbnail.done, (state: FirebaseState, success: Success<string, string>) => {
    let stateTmp =  Object.assign(state);
    stateTmp.works
      .filter((work: IWorkState) => work.thumbnail == success.params)
      .map((work: IWorkState) => { work.thumbnailURL = success.result })
    
    return Object.assign({}, state, { stateTmp });
  });

export const userReducer = reducerWithInitialState(initialUserState)
  .case(userActions.hoverWork, (state, workHover: WorkHover) => {
    return Object.assign({}, state, { workHover: workHover });
  });
