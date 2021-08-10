import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  icon = faUser;
  faPen = faPen;
  edit = false;
  user: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let userPerfil = localStorage.getItem('user');
    this.user = userPerfil && JSON.parse(userPerfil);

    if (this.user.admin) {
      this.icon = faUserTie;
    }
  }

  changeEdit() {
    this.edit = !this.edit;
  }

  handleEditar(name: string, tel: string, email: string, senha: string) {
    let request = {
      cpf: this.user.cpf,
      name,
      tel,
      email,
      senha: !senha.trim() ? undefined : senha,
    };

    this.http
      .put<any>('https://posto-api-vacina.herokuapp.com/aplicador', request)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
