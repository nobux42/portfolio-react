import actionCreatorFactory from 'typescript-fsa'
import { IWorkItemState } from '../states/work'

const actionCreator = actionCreatorFactory();

export interface IWorkItem {
  title: string
  skills: string[]
  description: string
  year: string
  thumbnail: string
  images: string[]
}

export const authActions = {
  setUser: actionCreator<firebase.User>('ACTIONS_AUTH_SET_USER')
}

export const workActions = {
  getWorks: actionCreator.async<void, IWorkItem[]>('ACTIONS_WORK_GET_WORKS'),
  getThumbnail: actionCreator.async<string, string>('ACTIONS_WORK_GET_THUMBNAIL'),
  getDetailImages: actionCreator.async<IWorkItemState | null, string[]>('ACTIONS_WORK_GET_DETAILIMAGES'),
}

export const userActions = {
  hoverWork: actionCreator<IWorkItemState | null>('ACTIONS_USER_HOVER_WORK'),
  selecteWork: actionCreator<IWorkItemState | null>('ACTIONS_USER_SELECT_WORK'),
}