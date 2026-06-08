import { Invoice } from "../Models/Invoice";
import { IObserver } from "../Observers/IObserver";
import { ISubject } from "../Observers/ISubject";
import { PaymentCompletedEvent } from "../Observers/PaymentCompletedEvent";
import { IInvoiceRepository } from "../Repositories/IInvoiceRepository";
import { ISubscriptionRepository } from "../Repositories/ISubscriptionRepository";
import { IPaymentProcessor } from "./IPaymentProcessor";

export class PaymentService implements ISubject<PaymentCompletedEvent> {
  private readonly observers: IObserver<PaymentCompletedEvent>[] = [];

  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly invoiceRepository: IInvoiceRepository,
    private readonly paymentProcessor: IPaymentProcessor
  ) {}

  attach(observer: IObserver<PaymentCompletedEvent>): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: IObserver<PaymentCompletedEvent>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(event: PaymentCompletedEvent): void {
    this.observers.forEach((observer) => observer.update(event));
  }

  processPayment(subscriptionId: number): Invoice {
    const subscription = this.subscriptionRepository.findById(subscriptionId);
    if (!subscription) {
      throw new Error(`Suscripción ${subscriptionId} no encontrada`);
    }
    if (!subscription.active) {
      throw new Error(`La suscripción ${subscriptionId} está inactiva`);
    }
    if (subscription.plan.price <= 0) {
      throw new Error("El plan gratuito no requiere procesamiento de pago");
    }

    const approved = this.paymentProcessor.process(subscription.plan.price);
    if (!approved) {
      throw new Error("El pago fue rechazado");
    }

    const invoice = new Invoice(
      this.nextInvoiceId(),
      subscription.user,
      subscription,
      subscription.plan.price
    );
    this.invoiceRepository.create(invoice);

    this.notify({
      user: subscription.user,
      subscription,
      invoice,
      amount: invoice.amount,
      paymentMethod: this.paymentProcessor.name,
    });

    return invoice;
  }

  private nextInvoiceId(): number {
    const ids = this.invoiceRepository.findAll().map((invoice) => invoice.id);
    return ids.length === 0 ? 1 : Math.max(...ids) + 1;
  }
}
