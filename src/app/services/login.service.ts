import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    debugger;
    const res = this.http.post(`${this.apiUrl}/login/`, { email, password });
    debugger;
    return res;
      // localStorage.setItem('token', user.token);
      // localStorage.setItem('userId', user.id);
  }

  getUserId() : any {
    return localStorage.getItem('userId');  // Recupera o ID do usuário
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');  // Remove o ID do usuário
  }
}

