// via-cep.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private baseUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  buscarEndereco(cep: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${cep}/json/`);
  }
}
