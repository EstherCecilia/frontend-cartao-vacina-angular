import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VacinasComponent } from './pages/vacinas/vacinas.component';
import { LoteComponent } from './pages/lote/lote.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AplicadorComponent } from './pages/aplicador/aplicador.component';
import { DialogContent } from './pages/vacinas/vacinas.component';
import { DialogContentLote } from './pages/lote/lote.component';
import { DialogContentUsuario } from './pages/usuario/usuario.component';
import { DialogContentAplicador } from './pages/aplicador/aplicador.component';
import { DialogContentRegistro } from './pages/registros/registros.component';
import { HeaderComponent } from './header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistrosComponent } from './pages/registros/registros.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    VacinasComponent,
    LoteComponent,
    UsuarioComponent,
    AplicadorComponent,
    RegistrosComponent,
    DialogContentUsuario,
    DialogContentAplicador,
    DialogContent,
    DialogContentLote,
    DialogContentRegistro,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
