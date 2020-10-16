import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TimeoutError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading: boolean;
  isFinishedSending: boolean;
  showResetForm = true;

  constructor(private fb: FormBuilder, private service: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.resetForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
    });
  }

  get email() {
    return this.resetForm.get('email').value;
  }
  get formControls() {
    return this.resetForm.controls;
  }

  resetPassword(formvalue) {
    console.log(formvalue);
    this.loading = true;
    this.isFinishedSending = false;
    this.resetForm.disable();
    this.service.forgotPassword(formvalue).subscribe((data: any) => {
      this.isFinishedSending = true;
      this.loading = false;
      setTimeout(() => {
        this.showResetForm = false;
      }, 500);
      this.resetForm.enable();
      console.log(data);
    }, (error: any) => {
      this.loading = false;
      this.isFinishedSending = false;
      this.resetForm.enable();
      console.log(error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 400) {
          console.log('bad request');
          this.resetForm.setErrors({
            badRequest: 'Email incorrect or link has already been sent. Please check'
          });
        } else {
          this.toastr.error(error.error ? error.error.error : 'An error has occured. Please try again later', 'Error');
        }
      } else if (error instanceof TimeoutError) {
        this.toastr.error('Time Out!', 'Server timeout. Please try again later');
      }
    });
  }

  displayResetForm() {
    this.resetForm.reset();
    this.isFinishedSending = false;
    this.showResetForm = true;
  }
}
