import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    debugger;
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  isLoggedIn(): boolean {
    // Verifique se o token JWT está presente no armazenamento local
    const token = localStorage.getItem('token');
    return !!token; // Retorna true se o token existir
  }

  logout(): void {
    localStorage.removeItem('token');
    // Redirecione para a página de login ou para a rota desejada
  }

  cadastro(name: string, email: string, password: string) {
    debugger;
    return this.http.post(`${this.apiUrl}/cadastro`, { name, email, password });
  }
}
