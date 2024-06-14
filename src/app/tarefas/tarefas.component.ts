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
  public userId = localStorage.getItem('userId');

  public selectedId    :number | undefined; 
  public selectedTitulo:string | undefined; 
  public selectedDescri:string | undefined; 
  public selectedCadast:string | undefined;
  public selectedEntreg:string | undefined;
  public selectedUsuari:number | undefined;
  public selectedDiscip:number | undefined;
  public selectedCatego:number | undefined;

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
    this.selectedId     = tarefa.ID;
    this.selectedTitulo = tarefa.TITULO;
    this.selectedDescri = tarefa.DESCRI;
    this.selectedCadast = tarefa.DTCADAST;
    debugger
    this.selectedEntreg = tarefa.DTENTREGA;
    this.selectedUsuari = tarefa.ID_USUARIO;
    this.selectedDiscip = tarefa.ID_DISCIPLINA;
    this.selectedCatego = tarefa.ID_CATEGORIA;
  }

  adicionar() {
    this.contentView = 3;
  }

  visualizar(tarefa: any) {
    this.contentView = 4;
    this.selectedId     = tarefa.ID;
    this.selectedTitulo = tarefa.TITULO;
    this.selectedDescri = tarefa.DESCRI;
    this.selectedCadast = tarefa.DTCADAST;
    this.selectedEntreg = tarefa.DTENTREGA;
    this.selectedUsuari = tarefa.ID_USUARIO;
    this.selectedDiscip = tarefa.ID_DISCIPLINA;
    this.selectedCatego = tarefa.ID_CATEGORIA;
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
      data.ID            = this.selectedId;
      data.TITULO        = this.selectedTitulo;
      data.DESCRI        = this.selectedDescri;
      data.DTCADAST      = this.selectedCadast;
      data.DTENTREGA     = this.selectedEntreg;
      data.ID_USUARIO    = this.userId;
      data.ID_DISCIPLINA = this.selectedDiscip;
      data.ID_CATEGORIA  = this.selectedCatego;
      this.service.editarTarefa(data).subscribe((res:any) => {
        if(res.blOk) {
          this.toastr.success("Tarefa editada!", 'SUCESSO:');
          this.sair();
        } else {
          this.toastr.error('Falha ao editar tarefa!', 'ERRO:');
        }
      });
    } else {
      data.TITULO        = this.selectedTitulo;
      data.DESCRI        = this.selectedDescri;
      data.DTCADAST      = this.selectedCadast;
      data.DTENTREGA     = this.selectedEntreg;
      data.ID_USUARIO    = this.userId;
      data.ID_DISCIPLINA = this.selectedDiscip;
      data.ID_CATEGORIA  = this.selectedCatego;
      this.service.addTarefa(data).subscribe((res:any) => {
        if(res.blOk) {
          this.toastr.success("Tarefa salva!", 'SUCESSO:');
          this.sair();
        } else {
          this.toastr.error('Falha ao salvar tarefa!', 'ERRO:');
        }
      });
    }
  }

  sair() {
    this.selectedId     = undefined;
    this.selectedTitulo = "";
    this.selectedDescri = "";
    this.selectedCadast = "";
    this.selectedEntreg = "";
    this.selectedUsuari = undefined;
    this.selectedDiscip = undefined;
    this.selectedCatego = undefined;
    this.tarefas = [];
    this.getTarefas();
    this.contentView = 1;
  }

}
