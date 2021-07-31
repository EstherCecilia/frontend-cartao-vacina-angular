import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VacinasComponent } from './pages/vacinas/vacinas.component';
import { LoteComponent } from './pages/lote/lote.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { DialogContent } from './pages/vacinas/vacinas.component';
import { DialogContentLote } from './pages/lote/lote.component';
import { DialogContentUsuario } from './pages/usuario/usuario.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, VacinasComponent,LoteComponent, UsuarioComponent, DialogContentUsuario, DialogContent, DialogContentLote],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
