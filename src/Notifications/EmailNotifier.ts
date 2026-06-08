import { Invoice } from "../Models/Invoice";
import { User } from "../Models/User";
import { INotifier } from "./INotifier";

export class EmailNotifier implements INotifier {
  send(user: User, invoice: Invoice): void {
    console.log(
      `[EMAIL] Factura #${invoice.id} enviada a ${user.email} por $${invoice.amount}`
    );
  }
}
