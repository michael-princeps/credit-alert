import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimeoutError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading: boolean;
  isChangeSuccessful: boolean;
  userDetails: any;
  constructor(private fb: FormBuilder, private service: AuthService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private title: Title) {
    this.title.setTitle('Credit Alert - Change Password');
   }

  ngOnInit(): void {
    this.formInit();
    this.route.queryParams.subscribe((params: Params) => {
      this.userDetails = params;
      console.log(this.userDetails);
    });
  }

  formInit() {
    this.changePasswordForm = this.fb.group({
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required, this.confirmaPasswordValidator]],
    });
  }

  get formControls() {
    return this.changePasswordForm.controls;
  }

  updateConfirmPasswordValidator(): void {
    Promise.resolve().then(() => this.changePasswordForm.controls.password_confirmation.updateValueAndValidity());
  }

  confirmaPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.changePasswordForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  changePassword(formvalue) {
    console.log(formvalue);
    const newPasswordDetails = {...formvalue, ...this.userDetails};
    console.log(newPasswordDetails);
    this.loading = true;
    this.isChangeSuccessful = false;
    this.changePasswordForm.disable();
    this.service.passwordReset(newPasswordDetails).subscribe((password: any) => {
      this.isChangeSuccessful = true;
      this.loading = false;
      this.changePasswordForm.enable();
      this.toastr.success(password.msg, 'Hurray!');
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 500);
    }, (error: any) => {
      this.loading = false;
      this.isChangeSuccessful = false;
      this.changePasswordForm.enable();
      console.log(error.error.message);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 400) {
          console.log('bad request');
          this.changePasswordForm.setErrors({
            badRequest: 'Email incorrect or link has already been sent. Please check'
          });
        } else {
          this.toastr.error(error.error.message ? error.error.message : 'An error has occured. Please try again later', 'Error');
        }
      } else if (error instanceof TimeoutError) {
        this.toastr.error('Time Out!', 'Server timeout. Please try again later');
      }
    });
  }
}
