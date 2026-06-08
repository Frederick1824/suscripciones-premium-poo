import { Subscription } from "../Models/Subscription";

export interface ISubscriptionRepository {
  create(subscription: Subscription): void;
  findById(id: number): Subscription | undefined;
  findAll(): Subscription[];
  update(subscription: Subscription): void;
  delete(id: number): void;
}
