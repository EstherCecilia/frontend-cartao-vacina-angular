import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'header-root',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private router: Router
  ) {}
  currentURL = '';
  login = true;
  faUser = faUser;


  ngOnInit(){
    let userPerfil = localStorage.getItem('user');

    if (!userPerfil) {
      this.router.navigate(['/']);
    }
  }
  title = 'cartaoVacina';
}
