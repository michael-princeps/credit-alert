import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/services/auth.service';
import { states } from '../shared/models/states';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  states: any[] = states;
  updateProfileForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private service: AuthService) { }

  ngOnInit(): void {
    this.initUpdateProfileForm();
  }

  initUpdateProfileForm() {
    this.updateProfileForm = this.fb.group({
      d_o_b: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      alt_phone_no: [null],
      home_address: [null, [Validators.required]],
    });
  }

  updateProfile(formvalue) {
    if (this.updateProfileForm.invalid) {
      return;
    }
    console.log(formvalue);
  }

}
