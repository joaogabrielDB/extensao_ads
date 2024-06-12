import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTarefas(id:any) {
    return this.http.post(`${this.apiUrl}/tarefa/listar`, {id});
  }

  addTarefa(data: any) {
    return this.http.post(`${this.apiUrl}/tarefa/adicionar`, {data});
  }

  editarTarefa(data: any) {
    return this.http.post(`${this.apiUrl}/tarefa/editar`, {data});
  }

  excluirTarefa(data: any) {
    return this.http.post(`${this.apiUrl}/tarefa/excluir`, {data});
  }

}
