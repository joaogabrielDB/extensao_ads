import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent implements OnInit {
  
  public contentView = 1;
  public categorias:any = [];
  public userId    :number = this.loginService.getUserId();
  public selectedId  : number | undefined; 
  public selectedNome: string | undefined; 
  
  constructor(
      private service     : CategoriasService
    , private loginService: LoginService
    , private toastr      : ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.service.getCategorias(this.userId).subscribe((res:any) => {
      if(res.blOk) {
        this.categorias = res.data;
      } else {
        this.toastr.error(res.message, 'ERRO:');
      }
    });
  }

  editar(categoria: any) {
    this.contentView = 2;
    this.selectedId = categoria.ID;
    this.selectedNome = categoria.NOME;
  }

  adicionar() {
    this.contentView = 3;
  }

  visualizar(categoria: any) {
    this.contentView = 4;
    this.selectedId = categoria.ID;
    this.selectedNome = categoria.NOME;
  }

  deletar(categoria: any) {
    this.service.excluirCategoria(categoria.ID).subscribe((res:any) => {
      if(res.blOk) {
        this.toastr.success("Categoria excluida!", 'SUCESSO:');
        this.sair();
      } else {
        this.toastr.error('Falha ao excluir categoria!', 'ERRO:');
      }
    });
  }

  salvar() {
    let data: any = {};
    if(this.selectedId) {
      data.ID = this.selectedId;
      data.NOME = this.selectedNome;
      data.ID_USUARIO = this.userId;
      this.service.editarCategoria(data).subscribe((res:any) => {
        if(res.blOk) {
          this.toastr.success("Categoria editada!", 'SUCESSO:');
          this.sair();
        } else {
          this.toastr.error('Falha ao editar categoria!', 'ERRO:');
        }
      });
    } else {
      data.NOME = this.selectedNome;
      data.ID_USUARIO = this.userId;
      this.service.addCategoria(data).subscribe((res:any) => {
        if(res.blOk) {
          this.toastr.success("Categoria salva!", 'SUCESSO:');
          this.sair();
        } else {
          this.toastr.error('Falha ao salvar categoria!', 'ERRO:');
        }
      });
    }
  }

  sair() {
    this.selectedId = undefined;
    this.selectedNome = "";
    this.categorias = [];
    this.getCategorias();
    this.contentView = 1;
  }
}
