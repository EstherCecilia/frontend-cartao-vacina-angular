import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentURL = '';
  login = true;
  faUser = faUser;

  constructor(private router:Router) {
    
  }

  ngOnInit(){
    this.currentURL = window.location.href;
    let quebra = this.currentURL.split('/');
    let uni = quebra[quebra.length - 1];

    this.login = uni.length > 0 ? false : true;
    console.log( this.login);
  }

  title = 'cartaoVacina';
}
