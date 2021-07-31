import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { VacinasComponent } from './pages/vacinas/vacinas.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'app', component:HomeComponent},
  {path:'app/vacinas', component:VacinasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
