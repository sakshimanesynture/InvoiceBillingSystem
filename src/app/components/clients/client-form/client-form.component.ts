import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  saving = false;
  error: string | null = null;
  mode: 'add' | 'edit' = 'add';
  clientId?: number;

  selectedCompany: string = '';
  companyLogo: string | null = null;

  viewClient: any = null;

  private gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.mode = 'edit';
      this.clientId = Number(idParam);
      this.loadClient(this.clientId);
    }
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      phone: ['', [Validators.maxLength(20)]],
      address: ['', [Validators.maxLength(500)]],
      city: ['', [Validators.maxLength(100)]],
      state: ['', [Validators.maxLength(100)]],
      pinCode: ['', [Validators.maxLength(20)]],
      gstNumber: ['', [Validators.maxLength(20)]],
      isActive: [true, [Validators.required]]
    });
  }

  loadClient(id: number) {
    this.loading = true;
    this.clientService.getClientById(id).pipe(
      catchError(err => {
        this.error = err?.error?.message || 'Failed to load client.';
        this.loading = false;
        return of(null);
      })
    ).subscribe(client => {
      this.loading = false;
      if (!client) return;

      this.form.patchValue({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
        city: client.city,
        state: client.state,
        pinCode: client.pinCode,
        gstNumber: client.gstNumber,
        isActive: client.isActive
      });

      this.selectedCompany = client.company ?? '';
      this.onCompanyChange();
      this.viewClient = client;
    });
  }

  onCompanyChange() {
    if (this.selectedCompany === 'synture') this.companyLogo = '/assets/images/synture.png';
    else if (this.selectedCompany === 'delxn') this.companyLogo = '/assets/images/delxn.png';
    else if (this.selectedCompany === 'farmfarry') this.companyLogo = '/assets/images/farmfarry1.png';
    else this.companyLogo = null;
  }

  get f() { return this.form.controls; }

  isGstValid(): boolean {
    const val = this.f['gstNumber'].value;
    if (!val) return true;
    return this.gstRegex.test(val.toUpperCase());
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }

  onSave() {
    if (this.form.invalid || !this.isGstValid()) {
      this.form.markAllAsTouched();
      return;
    }

    const data = { ...this.form.value, company: this.selectedCompany };
    this.saving = true;
    this.error = null;

    if (this.mode === 'add') {
      this.clientService.createClient(data).subscribe({
        next: (savedClient) => {
          this.saving = false;
          this.viewClient = savedClient;
          this.clientId = savedClient.id;
          this.mode = 'edit';
        },
        error: (err) => {
          this.saving = false;
          this.error = err?.error?.message || 'Failed to save client.';
        }
      });
    } else {
      this.clientService.updateClient(this.clientId!, data).subscribe({
        next: (updatedClient) => {
          this.saving = false;
          this.viewClient = updatedClient;
        },
        error: (err) => {
          this.saving = false;
          this.error = err?.error?.message || 'Failed to update client.';
        }
      });
    }
  }
}
