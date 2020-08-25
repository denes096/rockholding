import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn$: Observable<boolean>;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.loggedIn$ = this.authService.isLoggedIn;
  }

  onLogout()
  {
    this.authService.logout();
  }

}
