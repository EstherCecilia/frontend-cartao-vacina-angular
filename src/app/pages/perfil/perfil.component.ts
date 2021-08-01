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
  faUser = faUser;
  faUserTie = faUserTie;
  faPen = faPen;
  edit = false;

  constructor() {}

  ngOnInit(): void {}

  changeEdit() {
    this.edit = !this.edit;
  }
}
