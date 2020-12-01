import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAnyAction } from './TxAction';

export type IReducer<State, Actions> = (state: State, action: Actions) => State;

export class TxStore<State, Actions extends IAnyAction> {
  public readonly state$: BehaviorSubject<State>;
  private lastState: State;
  private readonly reducers: IReducer<State, Actions>[] = [];

  constructor(private storeName: string, initState: State) {
    this.state$ = new BehaviorSubject(initState);
    this.lastState = initState;
    this.state$.subscribe((state) => (this.lastState = state));
  }

  useState<T>(cb: (state: State) => T): T | null {
    const [data, setData] = useState<T | null>(null);
    useEffect(() => {
      const subscription = this.state$.pipe(map(cb)).subscribe((state) => setData({ ...state }));
      return () => {
        subscription.unsubscribe();
      };
    }, []);
    return data;
  }

  reduce(reducer: IReducer<State, Actions>) {
    this.reducers.push(reducer);
  }

  action(action: Actions) {
    const state = this.reducers.reduce(
      (acc, reducer) => {
        acc = reducer(acc, action);
        return acc;
      },
      { ...this.lastState }
    );
    console.log('action', action, state);
    this.state$.next(state);
  }
}
