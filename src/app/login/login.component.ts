import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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
  
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  public login() {
    this.authService.login(this.email, this.password).subscribe((res:any) => {
      debugger
      if (res.success) {
        this.toastr.success('Login efetuado com sucesso!', 'SUCESSO:');
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      } else {
        this.toastr.error(res.error, 'ERRO:');
        this.toastr.error('Login não efetuado, tente novamente!', 'ERRO:');
      }
    }, (error) => {
      console.log(error);
      //this.errorMessage = 'Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.';
    });
  }
}
