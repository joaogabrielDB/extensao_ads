import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    debugger;
    return this.http.post('http://localhost:3000/login', { email, password });
  }

  cadastro(name: string, email: string, password: string) {
    debugger;
    return this.http.post('http://localhost:3000/cadastro', { name, email, password });
  }
}
