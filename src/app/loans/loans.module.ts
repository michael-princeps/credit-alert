import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoansComponent } from './loans.component';
import { ApplyNewLoanComponent } from './apply-new-loan/apply-new-loan.component';
import { AllLoansComponent } from './all-loans/all-loans.component';
import { SingleLoanComponent } from './single-loan/single-loan.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoansComponent, ApplyNewLoanComponent, AllLoansComponent, SingleLoanComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoansRoutingModule
  ]
})
export class LoansModule { }
