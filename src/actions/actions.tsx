import actionCreatorFactory from 'typescript-fsa'
import { IWorkState } from '../states/firebase'

const actionCreator = actionCreatorFactory();

export interface IWork {
  title: string
  skills: string[]
  description: string
  year: string
  thumbnail: string
  images: string[]
}

export interface IWorkHover {
  hovered: boolean
  work: IWorkState | null
}

export const authActions = {
  setUser: actionCreator<firebase.User>('ACTIONS_AUTH_SET_USER')
}

export const firebaseActions = {
  getWorks: actionCreator.async<void, IWork[]>('ACTIONS_FIREBASE_GET_WORKS'),
  getThumbnail: actionCreator.async<string, string>('ACTIONS_FIREBASE_GET_THUMBNAIL'),
  getDetailImages: actionCreator.async<IWorkState | null, string[]>('ACTIONS_USER_GET_DETAILIMAGES'),
}

export const userActions = {
  hoverWork: actionCreator<IWorkHover>('ACTIONS_USER_HOVER_WORK'),
  selecteWork: actionCreator<IWorkState | null>('ACTIONS_USER_SELECT_WORK'),
}