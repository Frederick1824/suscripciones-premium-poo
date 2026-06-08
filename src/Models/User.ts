export type NotificationPreference = string;

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public notificationPreference: NotificationPreference,
    public hasPremiumAccess: boolean = false
  ) {}
}
