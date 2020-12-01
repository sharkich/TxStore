import React, { useEffect } from 'react';
import { articleService } from '../services/articles.service';
import { appStore } from '../store/app.store';
import { ArticlesStore } from '../store/articles.store';

export const Articles: React.FC = () => {
  useEffect(() => {
    const sub = articleService.articles$.subscribe();
    return () => {
      sub.unsubscribe();
    };
  }, []);
  const articles = appStore.useState((state) => state.entities.articles);
  const handleRemove = (id: string) => appStore.action(ArticlesStore.actions.remove(id));
  return (
    <div>
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
