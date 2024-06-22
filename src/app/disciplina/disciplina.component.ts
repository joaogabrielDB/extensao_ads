import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../services/disciplina.service';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrl: './disciplina.component.scss'
})
export class DisciplinaComponent implements OnInit {
  public contentView          = 1;
  public disciplinas : any    = [];
  public userId      : number = this.loginService.getUserId();
  public selectedId  : number | undefined; 
  public selectedNome: string | undefined; 
  public selectedProf: string | undefined; 

  constructor(
      private service     : DisciplinaService
    , private loginService: LoginService
    , private toastr      : ToastrService
  ) {}

  ngOnInit(): void {
    this.getDisciplinas();
  }

  getDisciplinas() {
    this.service.getDisciplinas(this.userId).subscribe((res:any) => {
      if(res.blOk) {
        this.disciplinas = res.data;
      } else {
        this.toastr.error(res.message, 'ERRO:');
      }
    });
  }

  editar(disciplina: any) {
    this.contentView = 2;
    this.selectedId = disciplina.ID;
    this.selectedNome = disciplina.NOME;
    this.selectedProf = disciplina.PROF;
  }

  adicionar() {
    this.contentView = 3;
  }

  visualizar(disciplina: any) {
    this.contentView = 4;
    this.selectedId = disciplina.ID;
    this.selectedNome = disciplina.NOME;
    this.selectedProf = disciplina.PROF;
  }

  deletar(disciplina: any) {
    this.service.excluirDisciplina(disciplina.ID).subscribe((res:any) => {
      if(res.blOk) {
        this.toastr.success("Disciplina excluida!", 'SUCESSO:');
        this.sair();
      } else {
        this.toastr.error('Falha ao excluir disciplina!', 'ERRO:');
      }
    });
  }

  salvar() {
    let data: any = {};
    if(this.selectedId) {
      data.ID = this.selectedId;
      data.NOME = this.selectedNome;
      data.PROF = this.selectedProf;
      data.ID_USUARIO = this.userId;
      this.service.editarDisciplina(data).subscribe((res:any) => {
        if(res.blOk) {
          this.toastr.success("Disciplina editada!", 'SUCESSO:');
          this.sair();
        } else {
          this.toastr.error('Falha ao editar disciplina!', 'ERRO:');
        }
      });
    } else {
      data.NOME = this.selectedNome;
      data.PROF = this.selectedProf;
      data.ID_USUARIO = this.userId;
      this.service.addDisciplina(data).subscribe((res:any) => {
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
    this.selectedNome = "";
    this.selectedProf = "";
    this.disciplinas = [];
    this.getDisciplinas();
    this.contentView = 1;
  }
}
