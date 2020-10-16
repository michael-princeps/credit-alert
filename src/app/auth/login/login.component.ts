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
    }, {
      updateOn: 'submit'
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  logIn(formvalue) {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(formvalue);
    this.loading = true;
    this.isAuthenticated = false;
    this.loginForm.disable();
    this.service.logIn(formvalue).subscribe((user: any) => {
      this.isAuthenticated = true;
      this.loading = false;
      this.loginForm.enable();
      console.log(user);
      this.service.storeToken(user.access_token);
      if (user.user.profile_status === '1') {
        this.service.storeUser(user.user);
        setTimeout(() => {
          this.router.navigate(['/loans']);
        }, 500);
      } else {
        this.router.navigate(['/profile_update']);
      }
    }, (error: any) => {
      this.loading = false;
      this.isAuthenticated = false;
      this.loginForm.enable();
      console.log(error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          console.log('unauthorized');
          this.loginForm.setErrors({
            unAuthorized: 'Username/Password incorrect'
          });
        } else {
          this.toastr.error(error.error ? error.error.error : 'An error has occured. Please try again later', 'Error');
        }
      } else if (error instanceof TimeoutError) {
        this.toastr.error('Time Out!', 'Server timeout. Please try again later');
      }
    });
  }
}
