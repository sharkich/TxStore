import { Article, IArticle } from '../models/article';
import { IAnyAction } from '../TxStore/TxAction';
import { AppState } from './app.store';

// State

export interface ArticlesState {
  ids: string[];
  entities: {
    [key: string]: Article;
  };
}

export const ARTICLES_INIT_STATE: ArticlesState = {
  ids: [],
  entities: {},
};

// Types

export enum ArticleActionTypes {
  Add = 'Add',
  Remove = 'Remove',
}

// Interfaces

export interface IAddAction extends IAnyAction {
  type: ArticleActionTypes.Add;
  payload: IArticle;
}

export interface IRemoveAction extends IAnyAction {
  type: ArticleActionTypes.Remove;
  payload: string;
}

// Combine

export type IArticleActions = IAddAction | IRemoveAction;

// Castings

export const isAddAction = (action: IAnyAction): action is IAddAction => action.type === ArticleActionTypes.Add;
export const isRemoveAction = (action: IAnyAction): action is IRemoveAction =>
  action.type === ArticleActionTypes.Remove;

// Action Creators

export const actions = {
  add: (payload: IArticle): IAddAction => ({
    type: ArticleActionTypes.Add,
    payload,
  }),
  remove: (payload: string): IRemoveAction => ({
    type: ArticleActionTypes.Remove,
    payload,
  }),
};

// Reducers

export const reducers = (state: AppState, action: IArticleActions) => {
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
