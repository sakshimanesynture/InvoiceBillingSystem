import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gst-billing',
  standalone: true,
  imports: [CommonModule, FormsModule],           
  templateUrl: './gst-billing.component.html',
  styleUrls: ['./gst-billing.component.css']
})
export class GstBillingComponent {

  openFaqIndex: number | null = null;             

  toggleFaq(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

}
