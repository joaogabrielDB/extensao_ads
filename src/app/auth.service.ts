import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/login', { username, password });
  }

  cadastro(name: string, username: string, password: string) {
    return this.http.post('http://localhost:3000/usuario', { name, username, password });
  }
}
