import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  cadastro() {
    this.authService.cadastro(this.name, this.email, this.password).subscribe((res:any) => {
      if (res.success) {
        this.toastr.success('Cadastro efetuado com sucesso!', 'SUCESSO:');
        this.router.navigate(['/login']);
      } else {
        //this.errorMessage = response.message;
      }
    }, (error) => {
      console.log(error);
      //this.errorMessage = 'Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.';
    });
  }
}
