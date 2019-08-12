import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory();

export interface IWork {
  title: string
  skills: string[]
  thumbnail: string
}

export const firebaseActions = {
  getWorks: actionCreator.async<void, IWork[]>('ACTIONS_FIREBASE_GET_WORKS'),
  getThumbnail: actionCreator.async<string, string>('ACTIONS_FIREBASE_GET_THUMBNAIL')
}

export const userActions = {
  hoverWork: actionCreator<IWork | null>('ACTIONS_USER_HOVER_WORK'),
}