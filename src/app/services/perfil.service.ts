import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDisciplinas(id: number) {
    return this.http.post(`${this.apiUrl}/disciplina/listar`, {id});
  }

  addDisciplina(data: any) {
    return this.http.post(`${this.apiUrl}/disciplina/adicionar`, {data});
  }

  editarDisciplina(data: any) {
    return this.http.post(`${this.apiUrl}/disciplina/editar`, {data});
  }

  excluirDisciplina(data: any) {
    return this.http.post(`${this.apiUrl}/disciplina/excluir`, {data});
  }
}
