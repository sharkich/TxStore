import { IArticle } from '../models/article';
import { IAnyAction } from '../TxStore/TxAction';

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

export const articles = {
  add: (payload: IArticle): IAddAction => ({
    type: ArticleActionTypes.Add,
    payload,
  }),
  remove: (payload: string): IRemoveAction => ({
    type: ArticleActionTypes.Remove,
    payload,
  }),
};
