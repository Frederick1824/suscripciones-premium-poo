import { INotificationFactory } from "../Factories/INotificationFactory";
import { IObserver } from "./IObserver";
import { PaymentCompletedEvent } from "./PaymentCompletedEvent";

export class NotificationObserver implements IObserver<PaymentCompletedEvent> {
  constructor(private readonly notificationFactory: INotificationFactory) {}

  update(event: PaymentCompletedEvent): void {
    const notifier = this.notificationFactory.createNotifier(
      event.user.notificationPreference
    );
    notifier.send(event.user, event.invoice);
  }
}
