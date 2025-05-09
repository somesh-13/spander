// features/food-swiper/components/food-card/food-card.component.ts
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit} from '@angular/core';
import { Food } from '../../../../shared/models/food.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.sass'],
  animations: [
    trigger('cardAnimation', [
      state('default', style({ 
        transform: 'none',
        opacity: 1
      })),
      state('swiped-left', style({ 
        transform: 'translateX(-150%) rotate(-30deg)',
        opacity: 0
      })),
      state('swiped-right', style({ 
        transform: 'translateX(150%) rotate(30deg)',
        opacity: 0
      })),
      transition('default => swiped-left', animate('300ms ease-out')),
      transition('default => swiped-right', animate('300ms ease-out')),
      transition('* => default', animate('300ms ease-in'))
    ])
  ]
})
export class FoodCardComponent {
  @Input() food?: Food; // Make food optional with the '?' operator
  @Output() liked = new EventEmitter<Food>();
  @Output() disliked = new EventEmitter<Food>();
  @ViewChild('cardElement') cardElement!: ElementRef;
  animationState: 'default' | 'swiped-left' | 'swiped-right' = 'default';
  likeVisible = false;
  dislikeVisible = false;


  constructor() {}
  
  ngAfterViewInit() {
    this.setupHammerGestures();
  }
  setupHammerGestures() {
    const card = this.cardElement.nativeElement;
    const hammertime = new Hammer(card);
    
    // Configure to detect horizontal swipes
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    
    hammertime.on('pan', (event) => {
      // Move card when dragging
      card.style.transform = `translateX(${event.deltaX}px) rotate(${event.deltaX * 0.05}deg)`;
      
      // Show like/dislike indicators based on swipe direction
      if (event.deltaX > 50) {
        this.likeVisible = true;
        this.dislikeVisible = false;
      } else if (event.deltaX < -50) {
        this.dislikeVisible = true;
        this.likeVisible = false;
      } else {
        this.likeVisible = false;
        this.dislikeVisible = false;
      }
    });
    
    hammertime.on('panend', (event) => {
      // Reset indicators
      this.likeVisible = false;
      this.dislikeVisible = false;
      
      // Card was swiped far enough to trigger like/dislike
      if (event.deltaX > 150) {
        this.onSwipeRight();
      } else if (event.deltaX < -150) {
        this.onSwipeLeft();
      } else {
        // Reset card position
        card.style.transform = '';
      }
    });
  }
  
  onSwipeLeft(): void {
    this.animationState = 'swiped-left';
    setTimeout(() => {
      this.disliked.emit(this.food);
      this.resetCard();
    }, 300);
  }
  
  onSwipeRight(): void {
    this.animationState = 'swiped-right';
    setTimeout(() => {
      this.liked.emit(this.food);
      this.resetCard();
    }, 300);
  }
  
  private resetCard(): void {
    this.animationState = 'default';
  }
}
