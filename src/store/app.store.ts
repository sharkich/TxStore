import { TxStore } from '../TxStore/TxStore';
import { ArticleActionTypes, ARTICLES_INIT_STATE, ArticlesState, IArticleActions, reducers } from './articles.store';

export interface AppState {
  ui: {
    isLoading: boolean;
    error: Error | null;
  };
  entities: {
    articles: ArticlesState;
  };
}

export type AppActions = IArticleActions;

export type AppActionTypes = ArticleActionTypes;

const INIT_APP_STATE: AppState = {
  ui: {
    isLoading: false,
    error: null,
  },
  entities: {
    articles: ARTICLES_INIT_STATE,
  },
};

// export type AppState = typeof store;

export const appStore = new TxStore<AppState, AppActions>('app', INIT_APP_STATE);

appStore.reduce(reducers);
