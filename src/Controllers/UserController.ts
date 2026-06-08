import { NotificationPreference, User } from "../Models/User";
import { UserService } from "../Services/UserService";

export class UserController {
  constructor(private readonly userService: UserService) {}

  register(
    name: string,
    email: string,
    notificationPreference: NotificationPreference
  ): User {
    return this.userService.register({
      name,
      email,
      notificationPreference,
    });
  }
}
