import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';   
import { RouterModule } from '@angular/router'; 
import { InvoiceService, Invoice } from '../../services/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'All';
  loadingPdf: boolean = false;

  constructor(private invoiceService: InvoiceService, private router: Router) {}


  ngOnInit(): void {
    this.loadInvoices();
  }

    goToNewInvoice() {
    this.router.navigate(['/invoices/new']);
  }

  loadInvoices() {
    this.invoiceService.getAllInvoices().subscribe((res: Invoice[]) => {
      this.invoices = res;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredInvoices = this.invoices.filter(inv => {
      const matchesSearch = inv.invoiceNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            inv.clientName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'All' || inv.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    this.applyFilters();
  }

  viewInvoice(id: number) {
    this.router.navigate(['/invoices', id]);
  }

  downloadPdf(id: number) {
    this.loadingPdf = true;
    this.invoiceService.downloadInvoicePdf(id).subscribe({
      next: (res: Blob) => {
        const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice_${id}.pdf`;
        a.click();
        this.loadingPdf = false;
      },
      error: () => {
        alert('Failed to download PDF');
        this.loadingPdf = false;
      }
    });
  }

  sendEmail(id: number, clientEmail: string) {
    this.invoiceService.sendInvoiceEmail(id).subscribe({
      next: () => alert(`Email sent to ${clientEmail}`),
      error: () => alert('Failed to send email')
    });
  }

  deleteInvoice(id: number) {
    if(confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe(() => {
        this.invoices = this.invoices.filter(inv => inv.id !== id);
        this.applyFilters();
      });
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  isOverdue(invoice: Invoice): boolean {
    return invoice.status === 'Overdue';
  }
}
