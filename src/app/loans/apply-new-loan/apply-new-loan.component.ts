import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TimeoutError } from 'rxjs';
import { titles } from 'src/app/auth/models/titles';
import { banks } from 'src/app/shared/models/banks';
import { LoansService } from '../services/loans.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-apply-new-loan',
  templateUrl: './apply-new-loan.component.html',
  styleUrls: ['./apply-new-loan.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ApplyNewLoanComponent implements OnInit {
  banks: any[] = banks.sort((a, b) => a.name.localeCompare(b.name));
  isLoading: boolean;
  newloanForm: FormGroup;
  showNewLoanForm = true;
  constructor(private fb: FormBuilder, private service: LoansService, private toastr: ToastrService, private title: Title) { 
    this.title.setTitle('Credit Alert - New Loan');
  }

  ngOnInit(): void {
    this.initNewLoanForm();
  }

  initNewLoanForm() {
    this.newloanForm = this.fb.group({
      loan_amount: [null, [Validators.required]],
      net_pay: [null, [Validators.required]],
      place_of_work: [null, [Validators.required]],
      bank_code: [null, [Validators.required]],
      acc_no: [null, [Validators.required]],
    });
  }

  get formControls() {
    return this.newloanForm.controls;
  }

  applyForLoan(formvalue) {
    if (this.newloanForm.invalid) {
      return;
    }
    const { bank_code } = formvalue;
    formvalue.bank_code = bank_code.bankcode;
    console.log(formvalue);
    this.isLoading = true;
    this.newloanForm.disable();
    this.service.applyForNewLoan(formvalue).subscribe((loan: any) => {
      this.isLoading = false;
      this.newloanForm.enable();
      if (loan.status === 'success') {
        this.showNewLoanForm = false;
        this.newloanForm.reset();
        this.toastr.success('Hurray', 'Loa');
      }
    }, (error: any) => {
      this.isLoading = false;
      console.log(error);
      this.newloanForm.enable();
      console.log(error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          this.newloanForm.setErrors({
            pendingLoan: 'You already have a pending loan'
          });
        }
      } else if (error instanceof TimeoutError) {
        this.toastr.error('Time Out!', 'Server timeout. Please try again later');
      }
    });
  }

  resetLoanForm() {
    this.showNewLoanForm = true;
  }
}
