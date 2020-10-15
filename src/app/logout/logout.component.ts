import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  isLogginOut: boolean;
  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.isLogginOut = true;
    this.service.logOut().subscribe(() => {
      this.isLogginOut = true;
      this.router.navigate(['/auth/login']);
    });
  }
}
