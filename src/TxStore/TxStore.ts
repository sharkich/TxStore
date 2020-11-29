import {useState} from "react";

export class TxStore<State> {
  private _state: State;

  constructor(private storeName: string, private initState: State) {
    this._state = {...initState};
  }
  
  useState<T>(cb: (state: State) => T): T {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState(cb(this._state));
    return data;
  }

  state(selector?: string): State {
    return {...this._state};
  }

  private actions: {[key: string]: { cb: (state: State, payload: any) => State }} = {};

  action<Payload>(actionName: string) {
    return {
      create: (payload: Payload) => {

      },
      resolve: (cb: (state: State, payload: Payload) => State) => {
        this.actions[actionName] = {
          cb
        };
      },
      dispatch: (payload: Payload) => {
        this.actions[actionName].cb(this.state(), payload);
      }
    }
  }
}
