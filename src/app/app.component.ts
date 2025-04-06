import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Spander';
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    // Scroll to top on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
    
    // Check if user is authenticated on app startup
    this.checkAuthStatus();
  }
  
  private checkAuthStatus(): void {
    // If user has valid token but no user data, try to load user
    if (this.authService.hasValidToken()) {
      // You could call a method to get the current user profile if needed
      // this.authService.getCurrentUser().subscribe();
    }
  }
}