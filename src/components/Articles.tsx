import React, { useEffect } from 'react';
import { Subject } from 'rxjs';
import { articleService } from '../services/articles.service';
import { appStore } from '../store/app.store';
import { ArticlesStore } from '../store/articles.store';

export const Articles: React.FC = () => {
  const articles = appStore.useState((state) => state.entities.articles);
  useEffect(() => {
    const sub = articles?.isLoading ? articleService.articles$.subscribe() : new Subject();
    return () => {
      sub.unsubscribe();
    };
  }, [articles?.isLoading]);
  const handleRemove = (id: string) => appStore.action(ArticlesStore.actions.remove(id));
  const handleToggleLoading = () => appStore.action(ArticlesStore.actions.toggleLoading());
  return (
    <div>
      <button onClick={handleToggleLoading}>{articles?.isLoading ? 'STOP' : 'START'}</button>
      <ol>
        {articles &&
          articles.ids.map((id) => (
            <li key={id}>
              {articles.entities[id].name} <button onClick={() => handleRemove(id)}>remove</button>
            </li>
          ))}
      </ol>
    </div>
  );
};
