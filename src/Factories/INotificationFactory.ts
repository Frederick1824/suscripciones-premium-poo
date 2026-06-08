import { NotificationPreference } from "../Models/User";
import { INotifier } from "../Notifications/INotifier";

export interface INotificationFactory {
  createNotifier(preference: NotificationPreference): INotifier;
}
