import { IObserver } from "./IObserver";
import { PaymentCompletedEvent } from "./PaymentCompletedEvent";

export class AccessControlObserver implements IObserver<PaymentCompletedEvent> {
  update(event: PaymentCompletedEvent): void {
    event.user.hasPremiumAccess = true;

    console.log(
      `[ACCESS] Acceso premium activado para ${event.user.name}`
    );
  }
}
