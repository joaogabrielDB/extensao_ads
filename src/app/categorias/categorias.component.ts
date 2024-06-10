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
  public userId:number = this.loginService.getUserId();
  public selectedId: number | undefined; 
  public selectedNome: string | undefined; 
  
  constructor(private service: CategoriasService, private loginService: LoginService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    debugger
    this.service.getCategorias(this.userId).subscribe((res:any) => {
      if(res.blOk) {
        console.log(res);
        this.categorias = res.data;
        console.log(this.categorias);
      } else {
        this.toastr.error(res.message, 'ERRO:');
      }
    })
  }

  edit(categoria: any) {
    this.contentView = 2;
    console.log(categoria);
  }

  add() {
    this.contentView = 3;
  }

  view(categoria: any) {
    this.contentView = 4;
    console.log(categoria);
     this.selectedId = categoria.ID; // atualiza o ID selecionado
    this.selectedNome = categoria.NOME; // atualiza o NOME selecionado
  }

  del(categoria: any) {
    console.log(categoria);
  }

  sair() {
    this.contentView = 1;
  }
}
