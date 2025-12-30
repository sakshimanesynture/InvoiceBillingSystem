import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceListComponent } from './invoice-list.component';
import { InvoiceService } from 'src/app/services/invoice.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;
  let invoiceService: InvoiceService;

  const mockInvoices = [
    { id: 1, invoiceNumber: 'INV-001', clientName: 'Client A', invoiceDate: '2025-11-01', dueDate: '2025-11-15', totalAmount: 1000, paidAmount: 500, status: 'Partially Paid' },
    { id: 2, invoiceNumber: 'INV-002', clientName: 'Client B', invoiceDate: '2025-11-02', dueDate: '2025-11-16', totalAmount: 2000, paidAmount: 2000, status: 'Paid' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceListComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ],
      providers: [ InvoiceService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceListComponent);
    component = fixture.componentInstance;
    invoiceService = TestBed.inject(InvoiceService);

    spyOn(invoiceService, 'getAllInvoices').and.returnValue(of(mockInvoices));

    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load invoices on init', () => {
    expect(component.invoices.length).toBe(2);
    expect(component.filteredInvoices.length).toBe(2);
  });

  it('should filter invoices by search term', () => {
    component.searchTerm = 'INV-001';
    component.onSearchChange();
    expect(component.filteredInvoices.length).toBe(1);
    expect(component.filteredInvoices[0].invoiceNumber).toBe('INV-001');
  });

  it('should filter invoices by status', () => {
    component.filterByStatus('Paid');
    expect(component.filteredInvoices.length).toBe(1);
    expect(component.filteredInvoices[0].status).toBe('Paid');
  });

  it('should format currency correctly', () => {
    const formatted = component.formatCurrency(123456.78);
    expect(formatted).toBe('₹1,23,456.78');
  });

  it('should format date correctly', () => {
    const formatted = component.formatDate('2025-11-17');
    expect(formatted).toBe('17-Nov-2025');
  });
});
