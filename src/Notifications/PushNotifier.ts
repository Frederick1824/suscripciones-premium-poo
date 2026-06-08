import { Invoice } from "../Models/Invoice";
import { User } from "../Models/User";
import { INotifier } from "./INotifier";

export class PushNotifier implements INotifier {
  send(user: User, invoice: Invoice): void {
    console.log(
      `[PUSH] Pago aprobado para ${user.name}. Factura #${invoice.id}`
    );
  }
}
