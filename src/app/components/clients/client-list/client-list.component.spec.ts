import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientListComponent } from './client-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientListComponent, FormsModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients', () => {
    component.loadClients();
    expect(component.clients.length).toBeGreaterThan(0);
  });

  it('should filter clients by search term', () => {
    component.clients = [
      { id: 1, name: 'Test One', email: '', isActive: true },
      { id: 2, name: 'Another', email: '', isActive: false }
    ];
    component.searchTerm = 'Test';
    component.onSearchChange();
    expect(component.filteredClients.length).toBe(1);
  });
});
