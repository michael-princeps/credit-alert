import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeoutError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  isAuthenticated: boolean;
  hide = true;
  constructor(private fb: FormBuilder, private service: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  logIn(formvalue) {
    console.log(formvalue);
    this.loading = true;
    this.isAuthenticated = false;
    this.service.logIn(formvalue).subscribe((user: any) => {
      this.isAuthenticated = true;
      this.loading = false;
      console.log(user);
      this.service.storeToken(user.access_token);
      this.service.storeUser(user.user);
      this.router.navigate(['/dashboard']);
    }, (error: any) => {
      this.loading = false;
      this.isAuthenticated = false;
      console.log(error.error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          console.log('unauthorized');
          this.loginForm.setErrors({
            unAuthorized: 'Username/Password incorrect'
          });
        } else {
          this.toastr.error('Error', error.error ? error.error.error : 'An error has occured. Please try again later');
        }
      } else if (error instanceof TimeoutError) {
        this.toastr.error('Time Out!', 'Server timeout. Please try again later');
      }
    });
  }
}
