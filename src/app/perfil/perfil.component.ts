import { Component } from '@angular/core';
import { PerfilService } from '../services/perfil.service';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  public contentView = 1;
  public perfilUser     :any    = {};
  public userId         :number = this.loginService.getUserId();
  public selectedId     :number | undefined; 
  public selectedNome   :string | undefined; 
  public selectedEmail  :string | undefined; 
  public selectedSenha  :string | undefined; 
  public selectedDataCad:string | undefined; 

  constructor(
      private service     : PerfilService
    , private loginService: LoginService
    , private toastr      : ToastrService
  ) {}

  ngOnInit(): void {
    this.getPerfil();
    
  }

  getPerfil() {
    this.service.getPerfil(this.userId).subscribe((res:any) => {
      if(res.blOk) {
        this.perfilUser      = res.data[0];
        this.selectedId      = this.perfilUser.ID;
        this.selectedNome    = this.perfilUser.NOME;
        this.selectedEmail   = this.perfilUser.EMAIL;
        this.selectedDataCad = this.formatDate(this.perfilUser.DTCADAST);
      } else {
        this.toastr.error(res.message, 'ERRO:');
      }
    });
  }

  salvar() {
    let data: any = {};
    data.ID         = this.selectedId;
    data.NOME       = this.selectedNome;
    data.EMAIL      = this.selectedEmail;
    data.PASSWORD   = this.selectedSenha;
    this.service.editarPerfil(data).subscribe((res:any) => {
      if(res.blOk) {
        this.toastr.success("Perfil editado!", 'SUCESSO:');
        this.limpar();
      } else {
        this.toastr.error('Falha ao editar seu perfil!', 'ERRO:');
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) {
        return ''; 
    }
    dateString = dateString.slice(0, 10);
    const dateParts           = dateString.split('-');
    const formattedDateParts  = [dateParts[0], dateParts[1], dateParts[2] ];
    const formattedDateString = formattedDateParts.join('-');
    return formattedDateString;
  }

  limpar() {
    this.selectedId      = undefined;
    this.selectedNome    = '';
    this.selectedSenha   = '';
    this.selectedEmail   = '';
    this.selectedDataCad = '';
    this.getPerfil();
  }

}
