export interface IPaymentProcessor {
  readonly name: string;
  process(amount: number): boolean;
}
