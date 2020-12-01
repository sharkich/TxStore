import React, { useEffect } from 'react';
import { articleService } from '../services/articles.service';
import { appStore } from '../store/app.store';

export const Articles: React.FC = () => {
  useEffect(() => {
    const sub = articleService.articles$.subscribe();
    return () => {
      sub.unsubscribe();
    };
  }, []);
  const articles = appStore.useState((state) => state.entities.articles);
  return (
    <div>
      <ol>{articles && articles.ids.map((id) => <li key={id}>{articles.entities[id].name}</li>)}</ol>
    </div>
  );
};
