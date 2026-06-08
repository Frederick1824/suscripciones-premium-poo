import { IPlanFactory, PlanType } from "../Factories/IPlanFactory";
import { Subscription } from "../Models/Subscription";
import { ISubscriptionRepository } from "../Repositories/ISubscriptionRepository";
import { IUserRepository } from "../Repositories/IUserRepository";

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly userRepository: IUserRepository,
    private readonly planFactory: IPlanFactory
  ) {}

  subscribe(userId: number, planType: PlanType): Subscription {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`Usuario ${userId} no encontrado`);
    }

    const alreadyActive = this.subscriptionRepository
      .findAll()
      .some((subscription) => subscription.user.id === userId && subscription.active);
    if (alreadyActive) {
      throw new Error(`El usuario ${userId} ya tiene una suscripción activa`);
    }

    const subscription = new Subscription(
      this.nextId(),
      user,
      this.planFactory.createPlan(planType)
    );
    this.subscriptionRepository.create(subscription);
    return subscription;
  }

  findById(id: number): Subscription {
    const subscription = this.subscriptionRepository.findById(id);
    if (!subscription) {
      throw new Error(`Suscripción ${id} no encontrada`);
    }
    return subscription;
  }

  cancel(id: number): Subscription {
    const subscription = this.findById(id);
    subscription.active = false;
    subscription.user.hasPremiumAccess = false;
    this.subscriptionRepository.update(subscription);
    return subscription;
  }

  private nextId(): number {
    const ids = this.subscriptionRepository
      .findAll()
      .map((subscription) => subscription.id);
    return ids.length === 0 ? 1 : Math.max(...ids) + 1;
  }
}
