// core/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Add this line to define a fallback API URL
  private apiBaseUrl = 'https://jsonplaceholder.typicode.com';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadCurrentUser();
  }

  login(email: string, password: string): Observable<User> {
    // Use hardcoded URL instead of environment
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => this.handleAuthentication(response)),
        map(response => response.user),
        catchError(error => {
          console.error('Login error', error);
          return throwError(() => new Error(error.error?.message || 'Login failed'));
        })
      );
  }

  register(user: { name: string; email: string; password: string }): Observable<User> {
    // Use hardcoded URL instead of environment
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth/register`, user)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        map(response => response.user),
        catchError(error => {
          console.error('Registration error', error);
          return throwError(() => new Error(error.error?.message || 'Registration failed'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    // Use hardcoded URL instead of environment
    return this.http.post<{ token: string }>(`${this.apiBaseUrl}/auth/refresh`, { refreshToken })
      .pipe(
        tap(response => {
          localStorage.setItem('auth_token', response.token);
        }),
        map(response => response.token),
        catchError(error => {
          console.error('Token refresh error', error);
          this.logout();
          return throwError(() => new Error('Failed to refresh token'));
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    // You could implement token expiration check here
    return !!token;
  }

  // For development/demo purposes only - remove in production
  // This simulates a login without making an actual HTTP request
  mockLogin(email: string, password: string): Observable<User> {
    // Simple validation
    if (email === 'user@example.com' && password === 'password') {
      const mockResponse: AuthResponse = {
        token: 'mock_token_' + Math.random().toString(36).substr(2),
        refreshToken: 'mock_refresh_' + Math.random().toString(36).substr(2),
        user: {
          id: 1,
          name: 'Demo User',
          email: 'user@example.com',
          preferences: {
            favoriteCategories: ['Italian', 'Japanese'],
            dietaryRestrictions: ['Vegetarian']
          }
        }
      };
      
      this.handleAuthentication(mockResponse);
      return of(mockResponse.user);
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  private handleAuthentication(response: AuthResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }

  private loadCurrentUser(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user: User = JSON.parse(userStr);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
        this.logout();
      }
    }
  }
}