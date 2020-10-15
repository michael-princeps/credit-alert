import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(private service: AuthService) { }

  ngOnInit(): void {
      this.user = JSON.parse(this.service.getUser());
      console.log(this.user);
  }

}
