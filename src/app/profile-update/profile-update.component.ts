import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimeoutError } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { states } from '../shared/models/states';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  states: any[] = states;
  minDate = new Date('2001-12-31');
  maxDate = new Date('1955-01-01');
  updateProfileForm: FormGroup;
  isUpdating: boolean;
  isUpdated: boolean;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initUpdateProfileForm();
  }

  initUpdateProfileForm() {
    this.updateProfileForm = this.fb.group({
      city: [null, [Validators.required]],
      d_o_b: [null, [Validators.required]],
      state: [null, [Validators.required]],
      alt_phone_no: [null],
      home_address: [null, [Validators.required]],
    });
  }

  get formControls() {
    return this.updateProfileForm.controls;
  }

  updateProfile(formvalue) {
    if (this.updateProfileForm.invalid) {
      return;
    }
    const { d_o_b, state } = formvalue;
    formvalue.state = state.name;
    const month = new Date(d_o_b).getMonth() + 1;
    const day = new Date(d_o_b).getDate();
    const newDay = day < 10 ? `0${day}` : day;
    const newMonth = month < 10 ? `0${month}` : month;
    const year = new Date(d_o_b).getFullYear();
    const newdateofbirth = `${year}-${newMonth}-${newDay}`;
    formvalue.d_o_b = newdateofbirth;
    // formvalue.d_o_b = 20;
    console.log(formvalue);
    this.isUpdating = true;
    this.isUpdated = false;
    this.updateProfileForm.disable();
    this.service.updateProfile(formvalue).subscribe((profile: any) => {
      console.log(profile);
      this.service.storeUser(profile.user);
      this.updateProfileForm.enable();
      this.isUpdating = false;
      this.isUpdated = true;
      this.toastr.success(profile.message);
      setTimeout(() => {
        this.router.navigate(['/loans']);
      }, 500);
    }, (error: any) => {
      this.updateProfileForm.enable();
      this.isUpdating = false;
      this.isUpdated = false;
      console.log(error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.toastr.error('Unauthorised');
        } else if (error.status === 400) {
          console.log(error.error);
          const badRequestError = error.error;
          Object.keys(this.updateProfileForm.controls).forEach((key) => {
            if (badRequestError.data && badRequestError.data[key]) {
              console.log(badRequestError.data[key]);
              this.updateProfileForm.get(key).setErrors({ invalidErr: badRequestError.data[key] });
            } else {
              this.updateProfileForm.setErrors({
                badRequest: badRequestError.message
              });
            }
          });
        } else {
          this.toastr.error('Error', error.error ? error.error.error : 'An error has occured. Please try again later');
        }
      } else if (error instanceof TimeoutError) {
        this.toastr.error('Time Out!', 'Server timeout. Please try again later');
      }
    })
  }


}
