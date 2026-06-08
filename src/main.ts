import { PaymentController } from "./Controllers/PaymentController";
import { SubscriptionController } from "./Controllers/SubscriptionController";
import { UserController } from "./Controllers/UserController";
import { DatabaseConnection } from "./Config/DatabaseConnection";
import { NotificationFactory } from "./Factories/NotificationFactory";
import { PlanFactory } from "./Factories/PlanFactory";
import { AccessControlObserver } from "./Observers/AccessControlObserver";
import { MetricsServiceObserver } from "./Observers/MetricsServiceObserver";
import { NotificationObserver } from "./Observers/NotificationObserver";
import { InvoiceRepository } from "./Repositories/InvoiceRepository";
import { SubscriptionRepository } from "./Repositories/SubscriptionRepository";
import { UserRepository } from "./Repositories/UserRepository";
import { CreditCardPaymentProcessor } from "./Services/CreditCardPaymentProcessor";
import { PaymentService } from "./Services/PaymentService";
import { SubscriptionService } from "./Services/SubscriptionService";
import { UserService } from "./Services/UserService";
import { ConsoleView } from "./Views/ConsoleView";

function bootstrap(): void {
  const database = DatabaseConnection.getInstance();
  database.clear();

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

  paymentService.attach(
    new NotificationObserver(new NotificationFactory())
  );
  paymentService.attach(new MetricsServiceObserver());
  paymentService.attach(new AccessControlObserver());

  const userController = new UserController(userService);
  const subscriptionController = new SubscriptionController(
    subscriptionService
  );
  const paymentController = new PaymentController(paymentService);
  const view = new ConsoleView();

  view.showTitle("Registro");
  const user = userController.register(
    "Ana Torres",
    "ana@example.com",
    "email"
  );
  view.showUser(user);

  view.showTitle("Suscripción");
  const subscription = subscriptionController.subscribe(user.id, "premium");
  view.showSubscription(subscription);

  view.showTitle("Pago");
  const invoice = paymentController.pay(subscription.id);
  view.showInvoice(invoice);
  view.showPremiumAccess(user);

  view.showTitle("Persistencia Singleton");
  console.log(
    `Usuarios: ${database.users.length}, suscripciones: ${database.subscriptions.length}, facturas: ${database.invoices.length}`
  );
}

bootstrap();
