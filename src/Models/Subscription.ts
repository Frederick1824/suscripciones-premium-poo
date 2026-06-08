import { User } from "./User";
import { Plan } from "./Plan";

export class Subscription {
  constructor(
    public id: number,
    public user: User,
    public plan: Plan,
    public active: boolean = true
  ) {}
}