import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  onLogin(e: any, cod: string, password: string) {
    e.preventDefault();

    if (!cod || !password) {
      this.toastr.info('Informe a senha e código');
    } else {
      this.http
        .post<any>('https://posto-api-vacina.herokuapp.com/login', {
          cpf: cod,
          senha: password,
        })
        .subscribe((data) => {
          if (!data.status) {
            this.toastr.error(data.mensagem)
        
          } else {
            localStorage.setItem('user', JSON.stringify(data.data));
            this.router.navigate(['/app']);
          }
        });
    }
  }
}
