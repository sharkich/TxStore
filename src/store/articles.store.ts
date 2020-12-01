import { Article, IArticle } from '../models/article';
import { IAnyAction } from '../TxStore/TxAction';
import { AppState } from './app.store';

export namespace ArticlesStore {
  // State

  export interface State {
    ids: string[];
    entities: {
      [key: string]: Article;
    };
  }

  export const INIT_STATE: State = {
    ids: [],
    entities: {},
  };

  // Types

  export enum ActionTypes {
    Add = 'Add',
    Remove = 'Remove',
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

  // Combine

  export type IActions = IAddAction | IRemoveAction;

  // Castings

  const isAddAction = (action: IAnyAction): action is IAddAction => action.type === ActionTypes.Add;
  const isRemoveAction = (action: IAnyAction): action is IRemoveAction => action.type === ActionTypes.Remove;

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
  };

  // Reducers

  export const reducers = (state: AppState, action: IActions) => {
    if (isAddAction(action)) {
      const { payload } = action;
      state.entities.articles.ids.push(payload.id);
      state.entities.articles.entities[payload.id] = payload;
      return state;
    }
    if (isRemoveAction(action)) {
      const { payload } = action;
      state.entities.articles.ids = state.entities.articles.ids.filter((id) => id !== payload);
      delete state.entities.articles.entities[payload];
      return state;
    }
    return state;
  };
}
