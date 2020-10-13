import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

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
  constructor(private fb: FormBuilder, private service: AuthService) { }

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
    });
  }
}
