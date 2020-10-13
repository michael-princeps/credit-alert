import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean;
  isCreated: boolean;
  hide = true;

  constructor(private fb: FormBuilder, private service: AuthService) { }

  ngOnInit(): void {
    this.formInit();
  }


  formInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      phone_no: [null, [Validators.required]],
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
