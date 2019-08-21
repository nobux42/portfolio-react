import actionCreatorFactory from 'typescript-fsa'
import { IWorkState } from '../states/states'

const actionCreator = actionCreatorFactory();

export interface IWork {
  title: string
  skills: string[]
  thumbnail: string
}

export interface WorkHover {
  hovered: boolean
  work: IWorkState | null
}

export const firebaseActions = {
  getWorks: actionCreator.async<void, IWork[]>('ACTIONS_FIREBASE_GET_WORKS'),
  getThumbnail: actionCreator.async<string, string>('ACTIONS_FIREBASE_GET_THUMBNAIL')
}

export const userActions = {
  hoverWork: actionCreator<WorkHover>('ACTIONS_USER_HOVER_WORK'),
  SelecteWork: actionCreator<IWorkState | null>('ACTIONS_USER_SELECT_WORK'),
}