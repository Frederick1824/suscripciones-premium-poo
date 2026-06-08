import { Invoice } from "../Models/Invoice";
import { Subscription } from "../Models/Subscription";
import { User } from "../Models/User";

export class ConsoleView {
  showTitle(title: string): void {
    console.log(`\n=== ${title} ===`);
  }

  showUser(user: User): void {
    console.log(
      `Usuario registrado: #${user.id} ${user.name} <${user.email}>`
    );
  }

  showSubscription(subscription: Subscription): void {
    console.log(
      `Suscripción creada: #${subscription.id} - Plan ${subscription.plan.name} ($${subscription.plan.price})`
    );
  }

  showInvoice(invoice: Invoice): void {
    console.log(
      `Factura generada: #${invoice.id} - Total $${invoice.amount} - ${invoice.issueDate.toISOString()}`
    );
  }

  showPremiumAccess(user: User): void {
    console.log(
      `Acceso premium de ${user.name}: ${user.hasPremiumAccess ? "ACTIVO" : "INACTIVO"}`
    );
  }
}
