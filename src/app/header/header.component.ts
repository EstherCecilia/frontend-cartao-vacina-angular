import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'header-root',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentURL = '';
  login = true;
  faUser = faUser;


  title = 'cartaoVacina';
}
