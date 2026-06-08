import { Invoice } from "../Models/Invoice";
import { Subscription } from "../Models/Subscription";
import { User } from "../Models/User";

export class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;

  public readonly users: User[] = [];
  public readonly subscriptions: Subscription[] = [];
  public readonly invoices: Invoice[] = [];

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public clear(): void {
    this.users.length = 0;
    this.subscriptions.length = 0;
    this.invoices.length = 0;
  }
}
