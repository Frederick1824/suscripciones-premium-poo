import { User } from "../Models/User";

export interface IUserRepository {
  create(user: User): void;
  findById(id: number): User | undefined;
  findAll(): User[];
  update(user: User): void;
  delete(id: number): void;
}
