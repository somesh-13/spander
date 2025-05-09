// features/food-swiper/components/swipe-container/swipe-container.component.ts
import { Component, OnInit } from '@angular/core';
import { Food } from '../../../../shared/models/food.model';

@Component({
  selector: 'app-swipe-container',
  templateUrl: './swipe-container.component.html',
  styleUrls: ['./swipe-container.component.sass']
})
export class SwipeContainerComponent implements OnInit {
  foodItems: Food[] = [];
  currentIndex = 0;
  isLoading = true;
  constructor() {}
  
  ngOnInit(): void {
     // Simulate loading
     this.isLoading = true;
    // Load mock data for now
    setTimeout(() => {
      this.loadMockData();
      this.isLoading = false;
    }, 1000);
  }
  
  loadMockData(): void {
    this.foodItems = [
      {
        id: 1,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        imageUrl: 'https://kitchenswagger.com/wp-content/uploads/2023/05/margherita-pizza-final.jpg',
        category: 'Italian',
        tags: ['pizza', 'vegetarian', 'cheese'],
        rating: 4.5,
        calories: 285,
        nutritionInfo: {
          protein: 12,
          carbs: 35,
          fat: 10
        }
      },
      {
        id: 2,
        name: 'Beef Burger',
        description: 'Juicy beef patty with lettuce, tomato, and special sauce',
        imageUrl: 'https://kitchenswagger.com/wp-content/uploads/2021/05/turkey-burgers-3.jpg',
        category: 'American',
        tags: ['burger', 'beef', 'fast food'],
        rating: 4.2,
        calories: 520,
        nutritionInfo: {
          protein: 25,
          carbs: 42,
          fat: 28
        }
      },
      {
        id: 3,
        name: 'Chicken Curry',
        description: 'Spicy chicken curry with aromatic spices and herbs',
        imageUrl: 'https://vismaifood.com/storage/app/uploads/public/d58/a6e/2b7/thumb__700_0_0_0_auto.jpg',
        category: 'Indian',
        tags: ['curry', 'spicy', 'chicken'],
        rating: 4.7,
        calories: 370,
        nutritionInfo: {
          protein: 22,
          carbs: 25,
          fat: 18
        }
      }
    ];
  }
  
  onLiked(food: Food): void {
    console.log('Liked:', food.name);
    this.currentIndex++;
  }
  
  onDisliked(food: Food): void {
    console.log('Disliked:', food.name);
    this.currentIndex++;
  }
  
  get currentFood(): Food | undefined {
    return this.foodItems[this.currentIndex];
  }
  
  hasMoreFood(): boolean {
    return this.currentIndex < this.foodItems.length;
  }
  
  resetSwiper(): void {
    this.currentIndex = 0;
    this.loadMockData();
  }
}