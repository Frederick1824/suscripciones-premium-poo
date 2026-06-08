import { Plan } from "../Models/Plan";

export type PlanType = string;

export interface IPlanFactory {
  createPlan(type: PlanType): Plan;
}
