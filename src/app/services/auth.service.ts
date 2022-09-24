import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap } from 'rxjs';
import { TokenService } from './token.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email:string, password: string ) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email,password})
    .pipe (
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  // enviar token sin interceptores (lo que esta comentado), con interceptor (lo que no esta comentado)
  profile() {
    // UNA FORMA DE ENVIAR LOS HEADERS DE FORMA DINAMICA
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // SEGUNDA FORMA DE ENVIAR LOS HEADERS DE FORMA MAS SIMPLIFICADA
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
  }

  loginAndGetProfile(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(rta => this.profile()),
    )
  }
}
