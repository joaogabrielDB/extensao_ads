import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPerfil(id: number) {
    return this.http.post(`${this.apiUrl}/cadastro/dados`, {id});
  }

  editarPerfil(data: any) {
    return this.http.post(`${this.apiUrl}/cadastro/editar`, {data});
  }
}
