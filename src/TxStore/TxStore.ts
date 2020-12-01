import { cloneDeep, isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAnyAction } from './TxAction';

export class TxStore<State, Actions extends IAnyAction> {
  public readonly state$: BehaviorSubject<State>;
  private lastState: State;
  // TODO: Avoid any
  private readonly reducers: Array<{
    reducer: (action: Actions, state: any) => void;
    mapper: (state: State) => any;
  }> = [];

  constructor(private storeName: string, initState: State) {
    this.state$ = new BehaviorSubject(initState);
    this.lastState = initState;
    this.state$.subscribe((state) => (this.lastState = state));
  }

  useState<T>(mapper: (state: State) => T): T | null {
    const [data, setData] = useState<T | null>(null);
    useEffect(() => {
      const subscription = this.state$.pipe(map(mapper)).subscribe((state) => {
        setData((old) => (isEqual(old, state) ? old : { ...state }));
      });
      return () => {
        subscription.unsubscribe();
      };
    }, []);
    return data;
  }

  reduce<LocalState>(reducer: (action: Actions, state: LocalState) => void, mapper: (state: State) => LocalState) {
    this.reducers.push({
      reducer,
      mapper,
    });
  }

  action(action: Actions) {
    const newState = this.reducers.reduce((state, reducer) => {
      reducer.reducer(action, reducer.mapper(state));
      return state;
    }, cloneDeep(this.lastState));
    console.log('action', action, newState);
    this.state$.next(newState);
  }
}
