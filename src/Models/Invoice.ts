import { User } from "./User";
import { Subscription } from "./Subscription";

export class Invoice {
  constructor(
    public id: number,
    public user: User,
    public subscription: Subscription,
    public amount: number,
    public issueDate: Date = new Date()
  ) {}
}
