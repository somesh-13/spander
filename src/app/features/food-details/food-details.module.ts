import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodDetailsRoutingModule } from './food-details-routing.module';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { NutritionInfoComponent } from './nutrition-info/nutrition-info.component';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';


@NgModule({
  declarations: [
    FoodDetailsComponent,
    NutritionInfoComponent,
    RecipeInfoComponent
  ],
  imports: [
    CommonModule,
    FoodDetailsRoutingModule
  ]
})
export class FoodDetailsModule { }
