import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invoice {
  id: number;
  invoiceNumber: string;
  clientName: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  status: 'Paid' | 'Sent' | 'Overdue' | 'Draft' | 'Partially Paid';
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = 'http://your-api-url.com/invoices'; // replace with real backend

  constructor(private http: HttpClient) { }

  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

  downloadInvoicePdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, { responseType: 'blob' });
  }

  sendInvoiceEmail(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/send-email`, {});
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getInvoicesByClient(clientId: number): Observable<Invoice[]> {
  return this.http.get<Invoice[]>(`${this.apiUrl}?clientId=${clientId}`);
}

}
