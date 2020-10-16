import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimeoutError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { titles } from '../models/titles';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  titles: any[] = titles;
  selectedTitle: any = null;
  registerForm: FormGroup;
  loading: boolean;
  isCreated: boolean;
  hide = true;

  constructor(private fb: FormBuilder, private service: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.formInit();
  }


  formInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required, this.confirmaPasswordValidator]],
      title: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone_no: [null, [Validators.required]],
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  updateConfirmPasswordValidator(): void {
    Promise.resolve().then(() => this.registerForm.controls.password_confirmation.updateValueAndValidity());
  }

  confirmaPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }


  signUserUp(formvalue) {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(formvalue);
    const { title } = formvalue;
    formvalue.title = title.value;
    console.log(formvalue);
    this.loading = true;
    this.registerForm.disable();
    this.service.register(formvalue).subscribe((user: any) => {
      this.registerForm.enable();
      this.loading = false;
      console.log(user);
      this.toastr.success('Success', 'Registration Successful');
      this.router.navigate(['/auth/login']);
    }, (error: any) => {
      this.loading = false;
      this.registerForm.enable();
      console.log(error);
      if (error instanceof HttpErrorResponse) {
        this.toastr.error('Error', error.error ? error.error.error : 'An error has occured. Please try again later');
        if (error.status === 400) {
          console.log(error.error);
          const badRequestError = error.error;
          Object.keys(this.registerForm.controls).forEach((key) => {
            if (badRequestError.data[key]) {
              console.log(badRequestError.data[key]);
              this.registerForm.get(key).setErrors({ invalidErr: badRequestError.data[key] });
            }
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
