import { TxStore } from '../TxStore/TxStore';
import { Articles } from './articles.store';

export interface AppState {
  ui: {
    isLoading: boolean;
    error: Error | null;
  };
  entities: {
    articles: Articles.ArticlesState;
  };
}

export type AppActions = Articles.IArticleActions;

export type AppActionTypes = Articles.ArticleActionTypes;

const INIT_APP_STATE: AppState = {
  ui: {
    isLoading: false,
    error: null,
  },
  entities: {
    articles: Articles.ARTICLES_INIT_STATE,
  },
};

// export type AppState = typeof store;

export const appStore = new TxStore<AppState, AppActions>('app', INIT_APP_STATE);

appStore.reduce(Articles.reducers);
