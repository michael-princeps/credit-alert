import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { TimeoutError } from 'rxjs';
import { LoansService } from '../services/loans.service';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.scss']
})
export class AllLoansComponent implements OnInit, OnDestroy {
  allLoans: any[] = null;
  constructor(private service: LoansService, private loadingBar: LoadingBarService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchLoans();
  }
  ngOnDestroy() {
    this.loadingBar.stop();
  }

  fetchLoans() {
    this.loadingBar.start();
    this.service.fetchLoans().subscribe((loans: any) => {
      this.loadingBar.stop();
      console.log(loans);
      if (loans.status === 'success') {
        this.allLoans = loans.data;
      }
    }, (error: any) => {
      this.loadingBar.stop();
      console.log(error);
      if (error instanceof HttpErrorResponse) {
        this.toastr.error(error.error.message ? error.error.message : 'An error has occured. Please try again later', 'Error');
      } else if (error instanceof TimeoutError) {
        this.toastr.error('Time Out!', 'Server timeout. Please try again later');
      }
    });
  }
}
