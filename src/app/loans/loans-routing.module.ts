import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllLoansComponent } from './all-loans/all-loans.component';
import { ApplyNewLoanComponent } from './apply-new-loan/apply-new-loan.component';
import { LoansComponent } from './loans.component';
import { SingleLoanComponent } from './single-loan/single-loan.component';


const routes: Routes = [
  {
    path: '',
    component: LoansComponent,
    children: [
      {
        path: '',
        component: AllLoansComponent
      },
      {
        path: 'new',
        component: ApplyNewLoanComponent,
      },
      {
        path: 'view/:id',
        component: SingleLoanComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoansRoutingModule { }
