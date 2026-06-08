import { Invoice } from "../Models/Invoice";
import { PaymentService } from "../Services/PaymentService";

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  pay(subscriptionId: number): Invoice {
    return this.paymentService.processPayment(subscriptionId);
  }
}
