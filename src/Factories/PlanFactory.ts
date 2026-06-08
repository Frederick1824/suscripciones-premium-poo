import { Plan } from "../Models/Plan";
import { FreePlan } from "../Models/FreePlan";
import { PremiumPlan } from "../Models/PremiumPlan";
import { IPlanFactory, PlanType } from "./IPlanFactory";

export type PlanCreator = () => Plan;

export class PlanFactory implements IPlanFactory {
  private readonly creators: Map<string, PlanCreator>;

  constructor(additionalCreators: Record<string, PlanCreator> = {}) {
    this.creators = new Map<string, PlanCreator>([
      ["free", () => new FreePlan()],
      ["premium", () => new PremiumPlan()],
      ...Object.entries(additionalCreators),
    ]);
  }

  createPlan(type: PlanType): Plan {
    const creator = this.creators.get(type.toLowerCase());
    if (!creator) {
      throw new Error(`Tipo de plan no válido: ${type}`);
    }
    return creator();
  }
}
