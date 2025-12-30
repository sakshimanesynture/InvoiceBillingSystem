import { Routes } from '@angular/router';

// LIST COMPONENTS
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { DashboardComponent as DashComponent } from './components/dash/dash.component';

import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoiceListComponent } from './components/invoices/invoice-list.component';
import { TaxinvoiceComponent } from './components/taxinvoice/taxinvoice.component';
import { ClientFormComponent } from './components/clients/client-form/client-form.component';

export const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  { path: 'dash', component: DashComponent },

  { path: 'invoices', component: InvoiceFormComponent },
  { path: 'invoices/new', component: InvoiceFormComponent },
  { path: 'taxinvoice', component: TaxinvoiceComponent },

  { path: 'clients', component: ClientFormComponent },
  { path: 'clients/new', component: ClientFormComponent },
  { path: 'clients/edit/:id', component: ClientFormComponent },

  // 🔥 GST BILLING (lazy standalone)
  {
    path: 'gst-billing',
    loadComponent: () =>
      import('./pages/gst-billing/gst-billing.component')
        .then(m => m.GstBillingComponent)
  },

  {
    path: 'inventory',
    loadComponent: () =>
      import('./pages/inventory/inventory.component')
        .then(m => m.InventoryComponent)
  },

  {
    path: 'bookkeeping',
    loadComponent: () =>
      import('./pages/bookkeeping/bookkeeping.component')
        .then(m => m.BookkeepingComponent)
  },

  {
    path: 'pos-billing',
    loadComponent: () =>
      import('./pages/pos-billing/pos-billing.component')
        .then(m => m.PosBillingComponent)
  },

  {
    path: 'eway-billing',
    loadComponent: () =>
      import('./pages/eway-billing/eway-billing.component')
        .then(m => m.EwayBillingComponent)
  },

  {
    path: 'einvoicing',
    loadComponent: () =>
      import('./pages/einvoicing/einvoicing.component')
        .then(m => m.EinvoicingComponent)
  },

  // ✅ LEGAL PAGE (Privacy / Terms / FAQ)
  {
    path: 'legal',
    loadComponent: () =>
      import('./pages/legal/legal.component')
        .then(m => m.LegalComponent)
  },
  {
  path: 'invoice-form',
  loadComponent: () =>
    import('./components/invoice-form/invoice-form.component')
      .then(m => m.InvoiceFormComponent)
},


  { path: '**', redirectTo: 'dashboard' }
];
