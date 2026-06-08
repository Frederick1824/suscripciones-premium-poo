import { DatabaseConnection } from "../Config/DatabaseConnection";
import { Invoice } from "../Models/Invoice";
import { IInvoiceRepository } from "./IInvoiceRepository";

export class InvoiceRepository implements IInvoiceRepository {
  private readonly db = DatabaseConnection.getInstance();

  create(invoice: Invoice): void {
    this.db.invoices.push(invoice);
  }

  findById(id: number): Invoice | undefined {
    return this.db.invoices.find((invoice) => invoice.id === id);
  }

  findAll(): Invoice[] {
    return [...this.db.invoices];
  }
}
