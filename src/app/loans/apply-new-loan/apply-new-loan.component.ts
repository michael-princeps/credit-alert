import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      loan_amount: [null, [Validators.required, this.confirmValidator]],
      net_pay: [null, [Validators.required, this.confirmValidator]],
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
    const { bank_code, loan_amount, net_pay } = formvalue;
    formvalue.bank_code = bank_code.bankcode;
    formvalue.loan_amount = this.unFormat(loan_amount).slice(1, loan_amount.length);
    formvalue.net_pay = this.unFormat(net_pay).slice(1, net_pay.length);
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

  format(valString) {
    if (!valString) {
      return '';
    }
    const val = valString.toString();
    const parts = this.unFormat(val).split('.');
    return parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') + (!parts[1] ? '' : '.' + parts[1]);
  }


  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/^0+/, '');
    if (val.includes(',')) {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  }


  formatLoanAmountInput(e) {
    const val = e.target.value;
    const inputvalue = this.format(val);
    // tslint:disable-next-line: max-line-length
    let newValue: string;

    if (inputvalue) {
      if (inputvalue.length > 1) {
        newValue = `₦${inputvalue.slice(1, inputvalue.length)}`
      } else if (inputvalue.length === 1) {
        if (inputvalue.includes('₦')) {
          newValue = '';
        } else {
          newValue = `₦${inputvalue.slice(0, inputvalue.length)}`;
        }
      } else {
        newValue = '';
      }
    } else {
      newValue = '';
    }
    this.newloanForm.patchValue({ loan_amount: newValue });
  }

  formatNetPayAmountInput(e) {
    const val = e.target.value;
    const inputvalue = this.format(val);
    let newValue: string;
    if (inputvalue) {
      if (inputvalue.length > 1) {
        newValue = `₦${inputvalue.slice(1, inputvalue.length)}`;
      } else if (inputvalue.length === 1) {
        if (inputvalue.includes('₦')) {
          newValue = '';
        } else {
          newValue = `₦${inputvalue.slice(0, inputvalue.length)}`;
        }
      } else {
        newValue = '';
      }
    } else {
      newValue = '';
    }
    this.newloanForm.patchValue({ net_pay: newValue });
  }


  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    const val = this.unFormat(control.value);
    const newValue = val.slice(1, val.length);
    if (!control.value) {
      return { error: true, required: true };
    } else if (isNaN(newValue)) {
      return { invalidAmount: true, error: true };
    }
    return {};
  }

  keyUp(e) {
    // console.log(e)
  }
}
