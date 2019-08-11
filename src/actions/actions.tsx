import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory();

export interface IWork {
  title: string
  skills: string[]
}

export const firebaseActions = {
  getWorks: actionCreator.async<void, IWork[]>('ACTIONS_FIREBASE_GET_WORKS')
}

export const userActions = {
  hoverWork: actionCreator<IWork | null>('ACTIONS_USER_HOVER_WORK'),
}