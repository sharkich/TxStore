export interface IAnyAction<T = any> {
  type: string;
  payload?: T;
}

export interface IActionsMap {
  [key: string]: <IAnyAction<T>>(payload: T) => IAnyAction<T>;
}

export class TxAction {
  constructor(actionName: string) {
    super(props);
  }
}
