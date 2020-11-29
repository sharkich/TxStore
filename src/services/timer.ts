import { timer } from 'rxjs';

export const numbers$ = timer(3000, 1000);