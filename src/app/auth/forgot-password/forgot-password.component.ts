import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading: boolean;
  isAuthenticated: boolean;
  hide = true;
  constructor(private fb: FormBuilder, private service: AuthService) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.resetForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
    });
  }

  get formControls() {
    return this.resetForm.controls;
  }
}
