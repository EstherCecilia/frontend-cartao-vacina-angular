import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VacinasComponent } from './pages/vacinas/vacinas.component';
import { LoteComponent } from './pages/lote/lote.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'app', component:HomeComponent},
  {path:'app/vacinas', component:VacinasComponent},
  {path:'app/lotes', component:LoteComponent},
  {path:'app/usuarios', component:UsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
