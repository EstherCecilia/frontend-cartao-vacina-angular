import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VacinasComponent } from './pages/vacinas/vacinas.component';
import { LoteComponent } from './pages/lote/lote.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AplicadorComponent } from './pages/aplicador/aplicador.component';
import { RegistrosComponent } from './pages/registros/registros.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'app', component:HomeComponent},
  {path:'app/vacinas', component:VacinasComponent},
  {path:'app/lotes', component:LoteComponent},
  {path:'app/usuarios', component:UsuarioComponent},
  {path:'app/aplicadores', component:AplicadorComponent},
  {path:'app/registros', component:RegistrosComponent},
  {path:'app/perfil', component:PerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
