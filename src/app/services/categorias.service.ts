import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCategorias(id: number) {
    return this.http.post(`${this.apiUrl}/categoria/listar`, {id});
  }

  addCategoria(data: any) {
    return this.http.post(`${this.apiUrl}/categoria/adicionar`, {data});
  }

  editarCategoria(data: any) {
    return this.http.post(`${this.apiUrl}/categoria/editar`, {data});
  }

  excluirCategoria(data: any) {
    return this.http.post(`${this.apiUrl}/categoria/excluir`, {data});
  }
}
