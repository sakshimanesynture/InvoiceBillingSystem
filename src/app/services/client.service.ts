import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client, CreateClientDto, UpdateClientDto } from '../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private base = 'https://localhost:7001/api/clients';

  constructor(private http: HttpClient) {}

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.base}/${id}`);
  }

  createClient(data: CreateClientDto): Observable<Client> {
    return this.http.post<Client>(this.base, data);
  }

  updateClient(id: number, data: UpdateClientDto): Observable<Client> {
    return this.http.put<Client>(`${this.base}/${id}`, data);
  }
}
