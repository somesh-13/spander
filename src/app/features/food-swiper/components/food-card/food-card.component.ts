// features/food-swiper/components/food-card/food-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Food } from '../../../../shared/models/food.model';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.sass']
})
export class FoodCardComponent {
  @Input() food?: Food; // Make food optional with the '?' operator
  @Output() liked = new EventEmitter<Food>();
  @Output() disliked = new EventEmitter<Food>();
  
  onSwipeLeft(): void {
    this.disliked.emit(this.food);
  }
  
  onSwipeRight(): void {
    this.liked.emit(this.food);
  }
}