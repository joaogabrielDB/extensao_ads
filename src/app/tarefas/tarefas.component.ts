import { Component, OnInit } from '@angular/core';
import { TarefasService    } from '../services/tarefas.service';
import { ToastrService     } from 'ngx-toastr';
import { DisciplinaService } from '../services/disciplina.service';
import { CategoriasService } from '../services/categorias.service';
import { LoginService      } from '../services/login.service';

@Component({
    selector   : 'app-tarefas'
  , templateUrl: './tarefas.component.html'
  , styleUrl   : './tarefas.component.scss'
})
export class TarefasComponent implements OnInit {

  public contentView   = 1;
  public userId:number = this.loginService.getUserId();

  public tarefas:any     = [];
  public disciplinas:any = [];
  public categorias:any  = [];

  public selectedId    :number | undefined; 
  public selectedTitulo:string | undefined; 
  public selectedDescri:string | undefined; 
  public selectedCadast:string | undefined;
  public selectedEntreg:string | undefined;
  public selectedUsuari:number | undefined;
  public selectedDiscip: { id: number; nome: string } | undefined;
  public selectedCatego: { id: number; nome: string } | undefined;

  constructor(
      private service     : TarefasService
    , private disciplina  : DisciplinaService
    , private categoria   : CategoriasService
    , private loginService:LoginService
    , private toastr      : ToastrService
  ) {}

  ngOnInit(): void {
    this.getTarefas();
    this.getDisciplinas();
    this.getCategorias();
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

  getDisciplinas() {
    this.disciplina.getDisciplinas(this.userId).subscribe((res: any) => {
      if (res.blOk) {
        this.disciplinas = res.data;
      } else {
        this.toastr.error(res.message, 'ERRO:');
      }
    });
  }
  
  getCategorias() {
    this.categoria.getCategorias(this.userId).subscribe((res: any) => {
      if (res.blOk) {
        this.categorias = res.data;
      } else {
        this.toastr.error(res.message, 'ERRO:');
      }
    });
  }

  editar(tarefa: any) {
    this.contentView    = 2;
    this.selectedId     = tarefa.ID;
    this.selectedTitulo = tarefa.TITULO;
    this.selectedDescri = tarefa.DESCRI;
    this.selectedEntreg = this.formatDate2(tarefa.DTENTREGA);
    this.selectedUsuari = tarefa.ID_USUARIO;
    this.selectedDiscip = this.disciplinas;
    this.selectedCatego = this.categorias;
  }

  adicionar() {
    this.contentView = 3;
  }

  visualizar(tarefa: any) {
    this.contentView    = 4;
    this.selectedId     = tarefa.ID;
    this.selectedTitulo = tarefa.TITULO;
    this.selectedDescri = tarefa.DESCRI;
    this.selectedEntreg = this.formatDate2(tarefa.DTENTREGA);
    this.selectedUsuari = tarefa.ID_USUARIO;
    this.selectedDiscip = tarefa.NOME_DISCIPLINA;
    this.selectedCatego = tarefa.NOME_CATEGORIA;
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
    this.selectedUsuari = undefined;
    this.selectedDiscip = undefined;
    this.selectedCatego = undefined;
    this.selectedTitulo = "";
    this.selectedDescri = "";
    this.selectedCadast = "";
    this.selectedEntreg = "";
    this.tarefas        = [];
    this.contentView    = 1;
    this.getTarefas();
  }

  formatDate(dateString: string): string {
    if (!dateString) {
        return ''; 
    }
    dateString = dateString.slice(0, 10);
    const dateParts           = dateString.split('-');
    const formattedDateParts  = [dateParts[2], dateParts[1], dateParts[0]];
    const formattedDateString = formattedDateParts.join('/');
    return formattedDateString;
  }

  formatDate2(dateString: string): string {
    if (!dateString) {
        return ''; 
    }
    dateString = dateString.slice(0, 10);
    const dateParts           = dateString.split('-');
    const formattedDateParts  = [dateParts[0], dateParts[1], dateParts[2] ];
    const formattedDateString = formattedDateParts.join('-');
    return formattedDateString;
  }

}
