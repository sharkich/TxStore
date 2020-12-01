import { interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Article } from '../models/article';
import { appStore } from '../store/app.store';
import { actions } from '../store/articles.store';

export class ArticlesService {
  readonly articles$ = interval(1000).pipe(
    map((value) => new Article(`id_${value}`, `Article #${value}`)),
    tap((article) => appStore.action(actions.add(article)))
  );

  readonly articlesDelete$ = interval(3000).pipe(
    map((value) => `id_${value}`),
    tap((id) => appStore.action(actions.remove(id)))
  );
}

export const articleService = new ArticlesService();
