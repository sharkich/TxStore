import { interval } from 'rxjs';
import {map, tap} from "rxjs/operators";
import {Article} from "../models/article";
import {articlesStore} from "../store/articles.store";

export const articles$ = interval(1000)
  .pipe(
    map(value => new Article(`id_${value}`, `Article #${value}`)),
    tap(article => articlesStore.action('add').dispatch(article))
  );

export const articlesDelete$ = interval(3000)
  .pipe(
    map(value => `id_${value}`),
    tap(id => articlesStore.action('add').dispatch(id))
  );
