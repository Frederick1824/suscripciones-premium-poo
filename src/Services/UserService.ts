import { NotificationPreference, User } from "../Models/User";
import { IUserRepository } from "../Repositories/IUserRepository";

export interface RegisterUserData {
  name: string;
  email: string;
  notificationPreference: NotificationPreference;
}

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  register(data: RegisterUserData): User {
    const emailInUse = this.userRepository
      .findAll()
      .some((user) => user.email.toLowerCase() === data.email.toLowerCase());

    if (emailInUse) {
      throw new Error(`El email ${data.email} ya está registrado`);
    }

    const user = new User(
      this.nextId(),
      data.name,
      data.email,
      data.notificationPreference
    );
    this.userRepository.create(user);
    return user;
  }

  findById(id: number): User {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw new Error(`Usuario ${id} no encontrado`);
    }
    return user;
  }

  private nextId(): number {
    const ids = this.userRepository.findAll().map((user) => user.id);
    return ids.length === 0 ? 1 : Math.max(...ids) + 1;
  }
}
