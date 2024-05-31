import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent {

  constructor(private router: Router) {}

  logout() {
    // Limpe as informações de autenticação (por exemplo, remova o token do localStorage)
    localStorage.removeItem('token');
    // Redirecione para a tela de login
    this.router.navigate(['/login']);
  }
  
}
