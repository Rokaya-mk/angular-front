import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'naw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any | null = null;
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    const loggedInStatus = localStorage.getItem('loggedInStatus') === 'true';
    this.authService.loggedInStatus.next(loggedInStatus);

    this.authService.getLoginStatus().subscribe((status) => {
      this.loggedIn = status;
    });
  }

  ngOnInit(): void{
    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
