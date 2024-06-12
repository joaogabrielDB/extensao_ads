import { Component, OnInit } from '@angular/core';
import { TarefasService } from '../services/tarefas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.scss'
})
export class TarefasComponent implements OnInit {

  public contentView = 1;
  public tarefas:any = [];
  public userId = localStorage.getItem('userNome');

  public selectedId    :number | undefined; 
  public selectedTitulo:string | undefined; 
  public selectedDescri:string | undefined; 
  public selectedCadast:string | undefined;
  public selectedEntreg:string | undefined;
  public selectedUsuari:string | undefined;
  public selectedDiscip:string | undefined;
  public selectedCatego:string | undefined;

  constructor(
      private service: TarefasService
    , private toastr : ToastrService
  ) {}

  ngOnInit(): void {
    this.getTarefas();
  }

  getTarefas() {
    this.service.getTarefas(this.userId).subscribe((res:any) => {
      if(res.blOk) {
        this.tarefas = res.data;
      } else {
        this.toastr.error(res.message, 'ERRO:');
      }
    });
  }

  editar(tarefa: any) {
    this.contentView = 2;
    this.selectedId = tarefa.ID;
    this.selectedTitulo = tarefa.NOME;
    this.selectedDescri = tarefa.PROF;
  }

  adicionar() {
    this.contentView = 3;
  }

  visualizar(tarefa: any) {
    this.contentView = 4;
    this.selectedId = tarefa.ID;
    this.selectedTitulo = tarefa.NOME;
    this.selectedDescri = tarefa.PROF;
  }

  deletar(tarefa: any) {
    this.service.excluirTarefa(tarefa.ID).subscribe((res:any) => {
      if(res.blOk) {
        this.toastr.success("Tarefa excluida!", 'SUCESSO:');
        this.sair();
      } else {
        this.toastr.error('Falha ao excluir tarefa!', 'ERRO:');
      }
    });
  }

  salvar() {
    let data: any = {};
    if(this.selectedId) {
      data.ID = this.selectedId;
      data.NOME = this.selectedTitulo;
      data.PROF = this.selectedDescri;
      data.ID_USUARIO = this.selectedDescri;
      this.service.editarTarefa(data).subscribe((res:any) => {
        if(res.blOk) {
          this.toastr.success("Disciplina editada!", 'SUCESSO:');
          this.sair();
        } else {
          this.toastr.error('Falha ao editar disciplina!', 'ERRO:');
        }
      });
    } else {
      data.NOME = this.selectedTitulo;
      data.PROF = this.selectedDescri;
      data.ID_USUARIO = this.userId;
      this.service.addTarefa(data).subscribe((res:any) => {
        if(res.blOk) {
          this.toastr.success("Disciplina salva!", 'SUCESSO:');
          this.sair();
        } else {
          this.toastr.error('Falha ao salvar disciplina!', 'ERRO:');
        }
      });
    }
  }

  sair() {
    this.selectedId = undefined;
    this.selectedTitulo = "";
    this.selectedDescri = "";
    this.tarefas = [];
    this.getTarefas();
    this.contentView = 1;
  }

}
