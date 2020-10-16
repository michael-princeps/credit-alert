import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  urlModule = 'loan';

  constructor(private http: HttpClient, private router: Router) { }

  applyForNewLoan(newloan) {
    return this.http.post(`${environment.apiUrl}/${this.urlModule}/store`, newloan).pipe(catchError(error => throwError(error)));;
  }

  fetchLoans() {
    return this.http.get(`${environment.apiUrl}/${this.urlModule}/all`).pipe(catchError(error => throwError(error)));;
  }
}
