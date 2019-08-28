import actionCreatorFactory from 'typescript-fsa'
import { IWorkState } from '../states/states'

const actionCreator = actionCreatorFactory();

export interface IWork {
  title: string
  skills: string[]
  description: string
  thumbnail: string
  images: string[]
}

export interface WorkHover {
  hovered: boolean
  work: IWorkState | null
}

export const firebaseActions = {
  getWorks: actionCreator.async<void, IWork[]>('ACTIONS_FIREBASE_GET_WORKS'),
  getThumbnail: actionCreator.async<string, string>('ACTIONS_FIREBASE_GET_THUMBNAIL'),
  getDetailImages: actionCreator.async<IWorkState | null, string[]>('ACTIONS_USER_GET_DETAILIMAGES'),
}

export const userActions = {
  hoverWork: actionCreator<WorkHover>('ACTIONS_USER_HOVER_WORK'),
  SelecteWork: actionCreator<IWorkState | null>('ACTIONS_USER_SELECT_WORK'),
}