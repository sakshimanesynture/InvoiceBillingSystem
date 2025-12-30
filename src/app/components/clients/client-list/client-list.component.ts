import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


interface Client {
  id: number;
  name: string;
  email: string;   
  phone?: string;
  city?: string;
  state?: string;
  gstNumber?: string;
  isActive: boolean;
}

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
   constructor(private router: Router) {}
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';
  loading = false;
  error: string | null = null;
  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.loading = true;
    this.error = null;

    // Simulate API call (replace with real service call later)
    setTimeout(() => {
      try {
        this.clients = [
          { id: 1, name: 'ABC Pvt Ltd', email: 'abc@gmail.com', phone: '9876543210', city: 'Pune', state: 'Maharashtra', gstNumber: '27ABCDE1234F1Z5', isActive: true },
          { id: 2, name: 'XYZ Enterprises', email: 'xyz@gmail.com', phone: '9988776655', city: 'Mumbai', state: 'Maharashtra', gstNumber: '27XYZAB1234F1Z6', isActive: false }
        ];
        this.filteredClients = [...this.clients];
      } catch (err) {
        this.error = 'Failed to load clients.';
      } finally {
        this.loading = false;
      }
    }, 1000);
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredClients = this.clients.filter(c =>
      c.name.toLowerCase().includes(term)
    );
  }

  addClient() {
  this.router.navigate(['/clients/new']);
  }

  editClient(id: number) {
    this.router.navigate(['/clients/edit', id]);
  }

  deleteClient(client: Client) {
    if (confirm(`Are you sure you want to delete ${client.name}?`)) {
      this.clients = this.clients.filter(c => c.id !== client.id);
      this.filteredClients = [...this.clients];
    }
  }

  retry() {
    this.loadClients();
  }
}
