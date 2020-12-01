import { TxStore } from '../TxStore/TxStore';
import { ArticlesStore } from './articles.store';

export interface AppState {
  ui: {
    isLoading: boolean;
    error: Error | null;
  };
  entities: {
    articles: ArticlesStore.State;
  };
}

export type AppActions = ArticlesStore.IActions;

export type AppActionTypes = ArticlesStore.ActionTypes;

const INIT_APP_STATE: AppState = {
  ui: {
    isLoading: false,
    error: null,
  },
  entities: {
    articles: ArticlesStore.INIT_STATE,
  },
};

// export type AppState = typeof store;

export const appStore = new TxStore<AppState, AppActions>('app', INIT_APP_STATE);

appStore.reduce(ArticlesStore.reducers);
