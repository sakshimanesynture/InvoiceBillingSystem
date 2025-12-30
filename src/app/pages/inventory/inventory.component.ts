import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  standalone: true,
  template: `
    <h1>Inventory Management Page Loaded ✅</h1>
    <p>This page is working.</p>
  `,
  styles: [`
    h1 {
      padding: 40px;
      color: #2c3e50;
    }
  `]
})
export class InventoryComponent {}
