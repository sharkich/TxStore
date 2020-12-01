import { interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Article } from '../models/article';
import { appStore } from '../store/app.store';
import { ArticlesStore } from '../store/articles.store';

export class ArticlesService {
  readonly articles$ = interval(1000).pipe(
    map((value) => new Article(`id_${value}`, `Article #${value}`)),
    tap((article) => appStore.action(ArticlesStore.actions.add(article)))
  );

  readonly articlesDelete$ = interval(3000).pipe(
    map((value) => `id_${value}`),
    tap((id) => appStore.action(ArticlesStore.actions.remove(id)))
  );
}

export const articleService = new ArticlesService();
