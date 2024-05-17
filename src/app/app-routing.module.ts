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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'tarefas',
    component: TarefasComponent
  },
  {
    path: 'disciplina',
    component: DisciplinaComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
