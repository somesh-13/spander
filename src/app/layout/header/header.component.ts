// layout/header/header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  activeTab = 'swipes';
  
  constructor(private router: Router) {}
  
  switchTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'swipes') {
      this.router.navigate(['/food-swiper']);
    } else if (tab === 'recommendations') {
      this.router.navigate(['/favorites']);
    }
  }
}