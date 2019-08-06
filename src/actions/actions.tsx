import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory();

export const hogeActions = {
  updateName: actionCreator<string>('ACTIONS_UPDATE_NAME'),
  updateNameComplete: actionCreator<string>('ACTIONS_UPDATE_NAME_COMPLETE'),
  updateEmail: actionCreator.async<undefined, undefined>('ACTIONS_UPDATE_EMAIL')
};