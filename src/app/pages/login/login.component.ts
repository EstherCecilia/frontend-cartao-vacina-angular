import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  onChange(cod: string, password: string) {
    if (!cod || !password) {
      console.log('Informe a senha e código');
    }
    console.log(cod, password);
    this.router.navigate(['/app']);
  }
}
