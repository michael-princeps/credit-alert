import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlModule = 'auth';
  constructor(private http: HttpClient, private router: Router) { }

  storeToken(token: string) {
    return sessionStorage.setItem('creditalert-access-token', token);
  }

  getToken() {
    return sessionStorage.getItem('creditalert-access-token');
  }

  storeUser(user: any) {
    return sessionStorage.setItem('creditalert-user', JSON.stringify(user));
  }

  getUser() {
    return sessionStorage.getItem('creditalert-user');
  }

  isLoggedIn() {
    return !!this.getToken();
  }


  logIn(user: { email: string, password: string }) {
    return this.http.post(`${environment.apiUrl}/${this.urlModule}/login`, { user });
  }

  register(newuser: { email: string, password: string, name: string, phone_no: any }) {
    return this.http.post(`${environment.apiUrl}/${this.urlModule}/register`, { newuser });
  }

  clearSession() {
    return this.http.post(`${environment.apiUrl}/${this.urlModule}/logout`, {}).pipe(tap(() => {
      sessionStorage.clear();
    }));
  }

  logOut() {
    this.clearSession().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
