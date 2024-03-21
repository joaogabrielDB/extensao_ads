import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(res => {
      console.log(res);
      // aqui você pode fazer algo com a resposta, como armazená-la em um serviço de estado ou redirecionar o usuário
    });
  }
}
