import { Component } from '@angular/core';
import { CadastroService } from '../services/cadastro.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-usuario',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  public email:string = '';
  public name:string = '';
  public password:string = '';

  constructor(private authService: CadastroService, private router: Router, private toastr: ToastrService) {}

  async cadastro() {
    this.authService.cadastro(this.name, this.email, this.password).subscribe((res:any) => {
      if (res.blOk) {
        this.toastr.success(res.message, 'SUCESSO:');
        this.router.navigate(['/login']);
      } else {
        this.toastr.error(res.message, 'ERRO:');
      }
    }, (error) => {
      console.log(error);
      this.toastr.error('Ocorreu um erro durante o login. Por favor, tente novamente!');
    });
  }
}
