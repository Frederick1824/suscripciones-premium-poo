import { Invoice } from "../Models/Invoice";

export interface IInvoiceRepository {
  create(invoice: Invoice): void;
  findById(id: number): Invoice | undefined;
  findAll(): Invoice[];
}
