import { ISubscriptionRepository } from "./ISubscriptionRepository";
import { Subscription } from "../Models/Subscription";
import { DatabaseConnection } from "../Config/DatabaseConnection";

export class SubscriptionRepository implements ISubscriptionRepository {
  private db = DatabaseConnection.getInstance();

  create(subscription: Subscription): void {
    this.db.subscriptions.push(subscription);
  }

  findById(id: number): Subscription | undefined {
    return this.db.subscriptions.find(
      (subscription) => subscription.id === id
    );
  }

  findAll(): Subscription[] {
    return [...this.db.subscriptions];
  }

  update(subscription: Subscription): void {
    const index = this.db.subscriptions.findIndex(
      (storedSubscription) => storedSubscription.id === subscription.id
    );
    if (index === -1) {
      throw new Error(`Suscripción ${subscription.id} no encontrada`);
    }
    this.db.subscriptions[index] = subscription;
  }

  delete(id: number): void {
    const index = this.db.subscriptions.findIndex(
      (subscription) => subscription.id === id
    );
    if (index === -1) {
      throw new Error(`Suscripción ${id} no encontrada`);
    }
    this.db.subscriptions.splice(index, 1);
  }
}
