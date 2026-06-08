import { IPaymentProcessor } from "./IPaymentProcessor";

export class CreditCardPaymentProcessor implements IPaymentProcessor {
  readonly name = "Tarjeta de crédito";

  process(amount: number): boolean {
    if (amount <= 0) {
      return false;
    }

    console.log(`[PAYMENT] Cobro aprobado por $${amount} con ${this.name}`);
    return true;
  }
}
