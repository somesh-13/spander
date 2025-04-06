// shared/directives/swipe.directive.ts
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSwipe]'
})
export class SwipeDirective {
  @Output() swipeLeft = new EventEmitter<void>();
  @Output() swipeRight = new EventEmitter<void>();
  
  private startX: number = 0;
  private threshold: number = 100;
  private isDragging: boolean = false;
  
  constructor(private el: ElementRef) {}
  
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.isDragging = true;
  }
  
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    const currentX = event.touches[0].clientX;
    const diffX = currentX - this.startX;
    
    // Apply a transform to show the card is moving
    this.el.nativeElement.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.03}deg)`;
  }
  
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    const endX = event.changedTouches[0].clientX;
    const diffX = endX - this.startX;
    
    // Reset transform
    this.el.nativeElement.style.transform = 'none';
    this.isDragging = false;
    
    if (Math.abs(diffX) > this.threshold) {
      if (diffX > 0) {
        this.swipeRight.emit();
      } else {
        this.swipeLeft.emit();
      }
    }
  }
  
  // For desktop testing with mouse
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.startX = event.clientX;
    this.isDragging = true;
  }
  
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    
    const currentX = event.clientX;
    const diffX = currentX - this.startX;
    
    // Apply a transform to show the card is moving
    this.el.nativeElement.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.03}deg)`;
  }
  
  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (!this.isDragging) return;
    
    const endX = event.clientX;
    const diffX = endX - this.startX;
    
    // Reset transform
    this.el.nativeElement.style.transform = 'none';
    this.isDragging = false;
    
    if (Math.abs(diffX) > this.threshold) {
      if (diffX > 0) {
        this.swipeRight.emit();
      } else {
        this.swipeLeft.emit();
      }
    }
  }
  
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.isDragging) {
      this.el.nativeElement.style.transform = 'none';
      this.isDragging = false;
    }
  }
}