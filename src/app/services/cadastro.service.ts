import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  cadastro(name: string, email: string, password: string) {
    debugger;
    return this.http.post(`${this.apiUrl}/cadastro/`, { name, email, password });
  }
}
