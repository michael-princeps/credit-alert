import { Component, OnInit } from '@angular/core';
import { LoansService } from '../services/loans.service';

@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.scss']
})
export class AllLoansComponent implements OnInit {
  allLoans: any[] = null;
  constructor(private service: LoansService) { }

  ngOnInit(): void {
    this.fetchLoans();
  }

  fetchLoans() {
    this.service.fetchLoans().subscribe((loans: any) => {
      console.log(loans);
      if (loans.status === 'success') {
        this.allLoans = loans.data;
      }
    }, (error: any) => {

    });
  }
}
