import { Article } from '../models/article';
import { TxStore } from '../TxStore/TxStore';
import { IArticleActions } from './articles.store';

export interface AppState {
  ui: {
    isLoading: boolean;
    error: Error | null;
  };
  entities: {
    articles: {
      ids: string[];
      entities: {
        [key: string]: Article;
      };
    };
  };
}

export type AppActions = IArticleActions;

const store: AppState = {
  ui: {
    isLoading: false,
    error: null,
  },
  entities: {
    articles: {
      ids: [],
      entities: {},
    },
  },
};

// export type AppState = typeof store;

export const appStore = new TxStore<AppState, AppActions>('app', store);
