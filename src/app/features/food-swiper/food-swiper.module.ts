import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodSwiperRoutingModule } from './food-swiper-routing.module';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { SwipeContainerComponent } from './components/swipe-container/swipe-container.component';
import { SwipeControlsComponent } from './components/swipe-controls/swipe-controls.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { PanDirective } from './directives/pan.directive';


@NgModule({
  declarations: [
    FoodCardComponent,
    SwipeContainerComponent,
    SwipeControlsComponent,
    FilterBarComponent,
    PanDirective
  ],
  imports: [
    CommonModule,
    FoodSwiperRoutingModule
  ]
})
export class FoodSwiperModule { }
