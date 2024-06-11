import { NgModule         } from '@angular/core';
import { FormsModule      } from '@angular/forms';
import { BrowserModule    } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule     } from './app-routing.module';
import { AppComponent         } from './app.component';

import { LoginComponent       } from './login/login.component';
import { CadastroComponent    } from './cadastro/cadastro.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { PerfilComponent      } from './perfil/perfil.component';
import { TarefasComponent     } from './tarefas/tarefas.component';
import { DisciplinaComponent  } from './disciplina/disciplina.component';
import { CategoriasComponent  } from './categorias/categorias.component';
import { HomeComponent        } from './home/home.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    MenuLateralComponent,
    PerfilComponent,
    TarefasComponent,
    DisciplinaComponent,
    CategoriasComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule 
  ],
  providers: [
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
