import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { DatabaseConnection } from "../src/Config/DatabaseConnection";
import { NotificationFactory } from "../src/Factories/NotificationFactory";
import { PlanFactory } from "../src/Factories/PlanFactory";
import { Plan } from "../src/Models/Plan";
import { AccessControlObserver } from "../src/Observers/AccessControlObserver";
import { MetricsServiceObserver } from "../src/Observers/MetricsServiceObserver";
import { NotificationObserver } from "../src/Observers/NotificationObserver";
import { InvoiceRepository } from "../src/Repositories/InvoiceRepository";
import { SubscriptionRepository } from "../src/Repositories/SubscriptionRepository";
import { UserRepository } from "../src/Repositories/UserRepository";
import { CreditCardPaymentProcessor } from "../src/Services/CreditCardPaymentProcessor";
import { PaymentService } from "../src/Services/PaymentService";
import { SubscriptionService } from "../src/Services/SubscriptionService";
import { UserService } from "../src/Services/UserService";

beforeEach(() => {
  DatabaseConnection.getInstance().clear();
});

test("DatabaseConnection siempre devuelve la misma instancia", () => {
  assert.equal(
    DatabaseConnection.getInstance(),
    DatabaseConnection.getInstance()
  );
});

test("el flujo premium persiste la factura y notifica observadores", () => {
  const userRepository = new UserRepository();
  const subscriptionRepository = new SubscriptionRepository();
  const invoiceRepository = new InvoiceRepository();
  const userService = new UserService(userRepository);
  const subscriptionService = new SubscriptionService(
    subscriptionRepository,
    userRepository,
    new PlanFactory()
  );
  const paymentService = new PaymentService(
    subscriptionRepository,
    invoiceRepository,
    new CreditCardPaymentProcessor()
  );
  const metrics = new MetricsServiceObserver();

  paymentService.attach(new NotificationObserver(new NotificationFactory()));
  paymentService.attach(metrics);
  paymentService.attach(new AccessControlObserver());

  const user = userService.register({
    name: "Test User",
    email: "test@example.com",
    notificationPreference: "push",
  });
  const subscription = subscriptionService.subscribe(user.id, "premium");
  const invoice = paymentService.processPayment(subscription.id);

  assert.equal(invoice.amount, 9999);
  assert.equal(invoiceRepository.findAll().length, 1);
  assert.equal(user.hasPremiumAccess, true);
  assert.equal(metrics.getTotalRevenue(), 9999);
});

test("un plan gratuito no genera pagos ni facturas", () => {
  const userRepository = new UserRepository();
  const subscriptionRepository = new SubscriptionRepository();
  const invoiceRepository = new InvoiceRepository();
  const userService = new UserService(userRepository);
  const subscriptionService = new SubscriptionService(
    subscriptionRepository,
    userRepository,
    new PlanFactory()
  );
  const paymentService = new PaymentService(
    subscriptionRepository,
    invoiceRepository,
    new CreditCardPaymentProcessor()
  );

  const user = userService.register({
    name: "Free User",
    email: "free@example.com",
    notificationPreference: "sms",
  });
  const subscription = subscriptionService.subscribe(user.id, "free");

  assert.throws(
    () => paymentService.processPayment(subscription.id),
    /plan gratuito/
  );
  assert.equal(invoiceRepository.findAll().length, 0);
});

test("PlanFactory se extiende sin modificar su implementación", () => {
  class EnterprisePlan extends Plan {
    constructor() {
      super(3, "Enterprise", 25000);
    }
  }

  const factory = new PlanFactory({
    enterprise: () => new EnterprisePlan(),
  });

  assert.equal(factory.createPlan("enterprise").name, "Enterprise");
});
