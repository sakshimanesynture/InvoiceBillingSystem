import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashboardComponent {

  // controls which section is visible on dashboard
  activeSection: string = 'dashboard';

  constructor(private router: Router) {}

  // sidebar / card click handler
  show(section: string) {
    this.activeSection = section;
  }

  // + New Invoice button click
  goToInvoiceForm() {
    this.router.navigate(['/invoice-form']);
  }
}
