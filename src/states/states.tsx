import { Success } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { firebaseActions, userActions, IWork, WorkHover } from '../actions/actions';

export interface IWorkState extends IWork{
  thumbnailURL: string
  imageURLs: string[]
}

export interface FirebaseState {
  isLoading: boolean
  works: IWorkState[]
}

const initialFirebaseState: FirebaseState = {
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
      .filter((work: IWorkState) => work.thumbnail === success.params)
      .map((work: IWorkState) => work.thumbnailURL = success.result )
    
    return Object.assign({}, state, { stateTmp });
  })
  .case(firebaseActions.getDetailImages.done, (state: FirebaseState, success: Success<IWorkState | null, string[]>) => {
    if(success.params !== null) {
      const title = success.params.title
      let stateTmp =  Object.assign(state);
      stateTmp.works
        .filter((work: IWorkState) => work.title === title)
        .map((work: IWorkState) => work.imageURLs = success.result )
      
      return Object.assign({}, state, { stateTmp });
    }
    return Object.assign({}, state);
  })

export const userReducer = reducerWithInitialState(initialUserState)
  .case(userActions.hoverWork, (state: UserState, workHover: WorkHover) => {
    return Object.assign({}, state, { workHover: workHover });
  })
  .case(userActions.SelecteWork, (state: UserState, work: IWorkState | null) => {
    return Object.assign({}, state, { selectedWork: work });
  })
  
