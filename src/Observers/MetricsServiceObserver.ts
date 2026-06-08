import { IObserver } from "./IObserver";
import { PaymentCompletedEvent } from "./PaymentCompletedEvent";

export class MetricsServiceObserver implements IObserver<PaymentCompletedEvent> {
  private totalRevenue = 0;

  update(event: PaymentCompletedEvent): void {
    this.totalRevenue += event.amount;
    console.log(
      `[METRICS] Ingreso registrado: $${event.amount}. Total: $${this.totalRevenue}`
    );
  }

  getTotalRevenue(): number {
    return this.totalRevenue;
  }
}
