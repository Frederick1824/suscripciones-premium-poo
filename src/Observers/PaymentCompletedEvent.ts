import { Invoice } from "../Models/Invoice";
import { Subscription } from "../Models/Subscription";
import { User } from "../Models/User";

export interface PaymentCompletedEvent {
  user: User;
  subscription: Subscription;
  invoice: Invoice;
  amount: number;
  paymentMethod: string;
}
