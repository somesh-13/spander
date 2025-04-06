import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'food-swiper',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'food-swiper',
    loadChildren: () => import('./features/food-swiper/food-swiper.module').then(m => m.FoodSwiperModule)
    // Note: For testing, temporarily remove the AuthGuard
    // canActivate: [AuthGuard]
  },
  // Other routes...
  {
    path: '**',
    redirectTo: 'food-swiper'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
