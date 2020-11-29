import {Article} from "../models/article";
import {TxAction} from "../TxStore/TxAction";
import {TxStore} from "../TxStore/TxStore";

export interface ArticleState {
  ids: string[];
  entities: {
    [key: string]: Article;
  };
}

export const articlesStore = new TxStore<ArticleState>('article', {
  ids: [],
  entities: {}
});

export const addArticleAction = articlesStore.action('add').create();

articlesStore.action<Article>('add').resolve((state: ArticleState, payload) => ({
  ...state,
  ids: [...state.ids, payload.id],
  entities: {
    ...state.entities,
    [payload.id]: payload
  },
}));

articlesStore.action<string>('remove').resolve((state: ArticleState, payload) => {
  const entities = {...state.entities};
  delete entities[payload];
  return {
    ...state,
    ids: state.ids.filter(id => id !== payload),
    entities,
  };
});