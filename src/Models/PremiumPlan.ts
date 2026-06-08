import { Plan } from "./Plan";

export class PremiumPlan extends Plan {
  constructor() {
    super(2, "Premium", 9999);
  }
}