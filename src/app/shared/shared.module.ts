import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { RatingInputComponent } from './components/rating-input/rating-input.component';
import { SwipeDirective } from './directives/swipe.directive';
import { LazyLoadDirective } from './directives/lazy-load.directive';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    RatingInputComponent,
    SwipeDirective,
    LazyLoadDirective,
    TruncatePipe,
    FilterPipe
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    RatingInputComponent,
    SwipeDirective,
    LazyLoadDirective,
    TruncatePipe,
    FilterPipe
  ]
})
export class SharedModule { }
