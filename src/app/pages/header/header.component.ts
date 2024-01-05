import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
 
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
    location.reload();
  }

}
