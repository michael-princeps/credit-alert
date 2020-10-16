import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlModule = 'auth';
  redirectUrl: string;
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
    return this.http.post(`${environment.apiUrl}/${this.urlModule}/login`, user).pipe(catchError(error => throwError(error)));
  }

  register(newuser: { email: string, password: string, password_confirmation: string, first_name: string, phone_no: any, title: any }) {
    return this.http.post(`${environment.apiUrl}/${this.urlModule}/register`, newuser).pipe(catchError(error => throwError(error)));
  }

  forgotPassword(email) {
    return this.http.post(`${environment.apiUrl}/forgotPassword`, email).pipe(catchError(error => throwError(error)));
  }

  passwordReset(passwordDetails: { email: string, password: string, password_confirmation: string, token: string }) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.apiUrl}/${this.urlModule}/passwordReset?email=${passwordDetails.email}&token=${passwordDetails.token}&password=${passwordDetails.password}&password_confirmation=${passwordDetails.password_confirmation}`, {}).pipe(catchError(error => throwError(error)));
  }

  logOut() {
    return this.http.post(`${environment.apiUrl}/${this.urlModule}/logout`, {}).pipe(tap(() => {
      sessionStorage.clear();
    }));
  }

  // logOut() {
  //   this.clearSession().subscribe(() => {
  //     this.router.navigate(['/auth/login']);
  //   });
  // }

  updateProfile(profile: any) {
    return this.http.post(`${environment.apiUrl}/${this.urlModule}/updateProfile`, profile);
  }
}
