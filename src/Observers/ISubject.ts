import { IObserver } from "./IObserver";

export interface ISubject<T> {
  attach(observer: IObserver<T>): void;
  detach(observer: IObserver<T>): void;
  notify(data: T): void;
}
