import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  public email   :string = "";
  public password:string = "";
  
  constructor(private authService: LoginService, private router: Router, private toastr: ToastrService) {}

  public login() {
    this.authService.login(this.email, this.password).subscribe((res:any) => {
      if (res.blOk) {
        const user = res.user[0];
        this.toastr.success(res.message, 'SUCESSO:');
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', user.ID);
        localStorage.setItem('userNome', user.NOME);
        this.router.navigate(['/home']);
      } else {
        this.toastr.error(res.message, 'ERRO:');
      }
    }, (error) => {
      console.log(error);
      this.toastr.error('Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.', 'ERRO:');
    });
  }
}
