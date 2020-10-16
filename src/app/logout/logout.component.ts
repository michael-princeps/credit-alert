import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  isLogginOut: boolean;
  constructor(private service: AuthService, private router: Router, private toastr: ToastrService, private title: Title) {
    this.title.setTitle('Credit Alert - Sign Out');
   }

  ngOnInit(): void {
  }

  logOut() {
    this.isLogginOut = true;
    this.service.logOut().subscribe(() => {
      this.isLogginOut = true;
      this.router.navigate(['/auth/login']);
    }, (error: any) => {
      this.isLogginOut = false;
      this.toastr.error('An unknown error has occured');
    });
  }
}
