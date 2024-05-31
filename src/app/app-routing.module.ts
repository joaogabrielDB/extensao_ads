import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent      } from './login/login.component'
import { CadastroComponent   } from './cadastro/cadastro.component'
import { PerfilComponent     } from './perfil/perfil.component';
import { TarefasComponent    } from './tarefas/tarefas.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { HomeComponent       } from './home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
      path: 'login'
    , component: LoginComponent
  }, 
  {
      path: 'cadastro'
    , component: CadastroComponent
  },
  {
      path: 'perfil'
    , component: PerfilComponent
    , canActivate: [AuthGuard]
  },
  {
      path: 'tarefas'
    , component: TarefasComponent
    , canActivate: [AuthGuard]
  },
  {
      path: 'disciplina'
    , component: DisciplinaComponent
    , canActivate: [AuthGuard]
  },
  {
      path: 'categorias'
    , component: CategoriasComponent
    , canActivate: [AuthGuard]
  },
  {
      path: 'home'
    , component: HomeComponent
    , canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
