// features/food-swiper/food-swiper-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwipeContainerComponent } from './components/swipe-container/swipe-container.component';

const routes: Routes = [
  {
    path: '',
    component: SwipeContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodSwiperRoutingModule { }