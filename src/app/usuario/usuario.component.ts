import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  constructor(private authService: AuthService) {}

  usuario(name: string, username: string, password: string) {
    this.authService.usuario(name, username, password).subscribe(res => {
      console.log(res);
      // aqui você pode fazer algo com a resposta, como armazená-la em um serviço de estado ou redirecionar o usuário
    });
  }
}
