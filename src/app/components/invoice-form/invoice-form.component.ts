import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Company {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {

  form!: FormGroup;
  selectedCompany: Company | null = null;

  companies: Company[] = [
    { name: 'Synture Sol Pvt Ltd', logo: '/assets/images/synture.png' },
    { name: 'DelXN Technologies Pvt.Ltd', logo: '/assets/images/delxn.png' },
    { name: 'FarmFerry', logo: '/assets/images/farmfarry.png' }
  ];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      company: ['', Validators.required],
      clientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      city: [''],
      state: [''],
      pinCode: [''],
      gstNumber: [''],
      panNumber: [''],
      billingTo: [''],
      invoiceDate: [new Date().toISOString().substring(0, 10)],
      dueDate: [new Date().toISOString().substring(0, 10)],
      items: this.fb.array([this.createItem()])
    });
  }

  // Create new invoice item
  createItem(): FormGroup {
    return this.fb.group({
      description: [''],
      hsnCode: [''],
      gstRate: [0],
      amount: [0]
    });
  }

  // Getter for items FormArray
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  onCompanyChange(): void {
    const selectedName = this.form.value.company;
    this.selectedCompany = this.companies.find((c: Company) => c.name === selectedName) || null;
  }

  goToTaxInvoice() {
    const data = {
      ...this.form.value,
      companyData: this.selectedCompany   // <-- VERY IMPORTANT
    };

    this.router.navigate(['/taxinvoice'], {
      queryParams: { data: JSON.stringify(data) }
    });
  }




  calculateTotal(): number {
    return this.items.controls.reduce(
      (sum, item) => sum + Number(item.value.amount),
      0
    );
  }

  generatePDF(): void {
    const data = document.getElementById('invoice-pdf');
    if (!data) return;

    html2canvas(data, { scale: 2 }).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${this.form.value.clientName}.pdf`);
    });
  }

}
