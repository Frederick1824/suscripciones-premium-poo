import { IUserRepository } from "./IUserRepository";
import { User } from "../Models/User";
import { DatabaseConnection } from "../Config/DatabaseConnection";

export class UserRepository implements IUserRepository {
  private db = DatabaseConnection.getInstance();

  create(user: User): void {
    this.db.users.push(user);
  }

  findById(id: number): User | undefined {
    return this.db.users.find((user) => user.id === id);
  }

  findAll(): User[] {
    return [...this.db.users];
  }

  update(user: User): void {
    const index = this.db.users.findIndex((storedUser) => storedUser.id === user.id);
    if (index === -1) {
      throw new Error(`Usuario ${user.id} no encontrado`);
    }
    this.db.users[index] = user;
  }

  delete(id: number): void {
    const index = this.db.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error(`Usuario ${id} no encontrado`);
    }
    this.db.users.splice(index, 1);
  }
}
