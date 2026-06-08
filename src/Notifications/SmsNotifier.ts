import { Invoice } from "../Models/Invoice";
import { User } from "../Models/User";
import { INotifier } from "./INotifier";

export class SmsNotifier implements INotifier {
  send(user: User, invoice: Invoice): void {
    console.log(
      `[SMS] ${user.name}, tu pago de $${invoice.amount} fue confirmado`
    );
  }
}
