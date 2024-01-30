import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario:User= new User();
  constructor(public authService: AuthService,
     private router: Router,
) { }

  ngOnInit(): void {
 
 
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
    location.reload();
  }

}
