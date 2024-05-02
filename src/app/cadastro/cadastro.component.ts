import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  constructor(private authService: AuthService) {}

  cadastro(name: string, username: string, password: string) {
    this.authService.cadastro(name, username, password).subscribe(res => {
      console.log(res);
      // aqui você pode fazer algo com a resposta, como armazená-la em um serviço de estado ou redirecionar o usuário
    });
  }
}
