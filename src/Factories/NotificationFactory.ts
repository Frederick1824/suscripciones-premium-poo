import { NotificationPreference } from "../Models/User";
import { EmailNotifier } from "../Notifications/EmailNotifier";
import { INotifier } from "../Notifications/INotifier";
import { PushNotifier } from "../Notifications/PushNotifier";
import { SmsNotifier } from "../Notifications/SmsNotifier";
import { INotificationFactory } from "./INotificationFactory";

export type NotifierCreator = () => INotifier;

export class NotificationFactory implements INotificationFactory {
  private readonly creators: Map<string, NotifierCreator>;

  constructor(additionalCreators: Record<string, NotifierCreator> = {}) {
    this.creators = new Map<string, NotifierCreator>([
      ["email", () => new EmailNotifier()],
      ["sms", () => new SmsNotifier()],
      ["push", () => new PushNotifier()],
      ...Object.entries(additionalCreators),
    ]);
  }

  createNotifier(preference: NotificationPreference): INotifier {
    const creator = this.creators.get(preference.toLowerCase());
    if (!creator) {
      throw new Error(
        `Preferencia de notificación no válida: ${preference}`
      );
    }
    return creator();
  }
}
