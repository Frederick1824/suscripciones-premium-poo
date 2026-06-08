import { PlanType } from "../Factories/IPlanFactory";
import { Subscription } from "../Models/Subscription";
import { SubscriptionService } from "../Services/SubscriptionService";

export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  subscribe(userId: number, planType: PlanType): Subscription {
    return this.subscriptionService.subscribe(userId, planType);
  }

  cancel(subscriptionId: number): Subscription {
    return this.subscriptionService.cancel(subscriptionId);
  }
}
