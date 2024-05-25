import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public email   :string = "";
  public password:string = "";
  
  constructor(private authService: AuthService, private router: Router) {}

  public login() {
    this.authService.login(this.email, this.password).subscribe((res:any) => {
      if (res.success) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      } else {
        //this.errorMessage = response.message;
      }
    }, (error) => {
      console.log(error);
      //this.errorMessage = 'Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.';
    });
  }
}
