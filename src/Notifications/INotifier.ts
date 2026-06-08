import { Invoice } from "../Models/Invoice";
import { User } from "../Models/User";

export interface INotifier {
  send(user: User, invoice: Invoice): void;
}
