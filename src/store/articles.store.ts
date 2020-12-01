import { Article, IArticle } from '../models/article';
import { IAnyAction } from '../TxStore/TxAction';

export namespace ArticlesStore {
  // State

  export interface State {
    isLoading: boolean;
    ids: string[];
    entities: {
      [key: string]: Article;
    };
  }

  export const INIT_STATE: State = {
    isLoading: false,
    ids: [],
    entities: {},
  };

  // Types

  enum ActionTypes {
    Add = 'Add',
    Remove = 'Remove',
    ToggleLoading = 'ToggleLoading',
  }

  // Interfaces

  interface IAddAction extends IAnyAction {
    type: ActionTypes.Add;
    payload: IArticle;
  }

  interface IRemoveAction extends IAnyAction {
    type: ActionTypes.Remove;
    payload: string;
  }

  interface IToggleLoadingAction extends IAnyAction {
    type: ActionTypes.ToggleLoading;
  }

  // Combine

  export type IActions = IAddAction | IRemoveAction | IToggleLoadingAction;

  // Action Creators

  export const actions = {
    add: (payload: IArticle): IAddAction => ({
      type: ActionTypes.Add,
      payload,
    }),
    remove: (payload: string): IRemoveAction => ({
      type: ActionTypes.Remove,
      payload,
    }),
    toggleLoading: (): IToggleLoadingAction => ({
      type: ActionTypes.ToggleLoading,
    }),
  };

  // Castings

  const isAddAction = (action: IAnyAction): action is IAddAction => action.type === ActionTypes.Add;
  const isRemoveAction = (action: IAnyAction): action is IRemoveAction => action.type === ActionTypes.Remove;
  const isToggleLoadingAction = (action: IAnyAction): action is IToggleLoadingAction =>
    action.type === ActionTypes.ToggleLoading;

  // Reducers

  export const reducers = (action: IActions, state: State) => {
    if (isAddAction(action)) {
      const { payload } = action;
      state.ids.push(payload.id);
      state.entities[payload.id] = payload;
      return;
    }
    if (isRemoveAction(action)) {
      const { payload } = action;
      state.ids = state.ids.filter((id) => id !== payload);
      delete state.entities[payload];
      return;
    }
    if (isToggleLoadingAction(action)) {
      state.isLoading = !state.isLoading;
      if (state.isLoading) {
        state.ids = [];
        state.entities = {};
      }
      return;
    }
  };
}
