import { Success } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { firebaseActions, userActions, IWork, WorkHover } from '../actions/actions';

export interface IWorkState extends IWork{
  thumbnailURL: string
}

export interface FirebaseState {
  isLoading: boolean
  works: IWorkState[]
}

const initialFirebaseState: FirebaseState = {
  isLoading: false,
  works: [{
    title: "", 
    skills:[], 
    thumbnail: "", 
    thumbnailURL: ""}],
};

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

export const firebaseReducer = reducerWithInitialState(initialFirebaseState)
  .case(firebaseActions.getWorks.started, (state: FirebaseState) => {
    return Object.assign({}, state, { isLoading: true });
  })
  .case(firebaseActions.getWorks.done, (state: FirebaseState, success: Success<void, IWork[]>) => {
    return Object.assign({}, state, { works: success.result });
  })
  .case(firebaseActions.getThumbnail.done, (state: FirebaseState, success: Success<string, string>) => {
    let stateTmp =  Object.assign(state);
    stateTmp.isLoading = false;
    stateTmp.works
      .filter((work: IWorkState) => work.thumbnail == success.params)
      .map((work: IWorkState) => { work.thumbnailURL = success.result })
    
    return Object.assign({}, state, { stateTmp });
  })

export const userReducer = reducerWithInitialState(initialUserState)
  .case(userActions.hoverWork, (state, workHover: WorkHover) => {
    return Object.assign({}, state, { workHover: workHover });
  })
  .case(userActions.SelecteWork, (state, work: IWorkState | null) => {
    return Object.assign({}, state, { selectedWork: work });
  })
