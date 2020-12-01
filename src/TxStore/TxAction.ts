export interface IAnyAction<T = any> {
  type: string;
  payload?: T;
}
