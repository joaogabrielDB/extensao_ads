import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { CategoriasComponent } from './categorias/categorias.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    MenuLateralComponent,
    PerfilComponent,
    TarefasComponent,
    DisciplinaComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
