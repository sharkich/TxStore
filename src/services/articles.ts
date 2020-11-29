import { interval } from 'rxjs';
import {map} from "rxjs/operators";
import {Article} from "../models/article";

export const articles$ = interval(1000).pipe(map(value => new Article(`id_${value}`, `Article #${value}`)));