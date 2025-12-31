import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-taxinvoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taxinvoice.component.html',
  styleUrls: ['./taxinvoice.component.css']
})
export class TaxinvoiceComponent implements OnInit {

  invoiceData: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const queryData = this.route.snapshot.queryParamMap.get('data');

    if (queryData) {
      this.invoiceData = JSON.parse(queryData);

      setTimeout(() => {
        this.downloadPDF();
      }, 3000);
    }
  }

  getTotalAmount(): number {
    if (!this.invoiceData?.items) return 0;
    return this.invoiceData.items.reduce(
      (total: number, item: any) => total + Number(item.amount),
      0
    );
  }

  downloadPDF(): void {
    const element = document.getElementById('invoice-content');
    if (!element) return;

    html2canvas.default(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: -window.scrollY
    }).then((canvas: HTMLCanvasElement) => {

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${this.invoiceData?.clientName || 'invoice'}.pdf`);
    });
  }
}
