// swipe.directive.spec.ts
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SwipeDirective } from './swipe.directive';

@Component({
  template: `<div appSwipe (swipeLeft)="onSwipeLeft()" (swipeRight)="onSwipeRight()"></div>`
})
class TestComponent {
  onSwipeLeft(): void {
    // Empty method for spy
  }
  
  onSwipeRight(): void {
    // Empty method for spy
  }
}

describe('SwipeDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  let directive: SwipeDirective;
  let nativeElement: HTMLDivElement;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SwipeDirective, TestComponent]
    }).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(SwipeDirective));
    directive = directiveElement.injector.get(SwipeDirective);
    nativeElement = directiveElement.nativeElement;
    fixture.detectChanges();
  });
  
  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });
  
  describe('Touch events', () => {
    it('should track touchstart position', () => {
      const touchStartEvent = createTouchEvent('touchstart', 150, 0);
      nativeElement.dispatchEvent(touchStartEvent);
      
      expect(directive['startX']).toEqual(150);
      expect(directive['isDragging']).toBeTrue();
    });
    
    it('should update element transform on touchmove', () => {
      // First start the touch
      const touchStartEvent = createTouchEvent('touchstart', 150, 0);
      nativeElement.dispatchEvent(touchStartEvent);
      
      // Then move
      const touchMoveEvent = createTouchEvent('touchmove', 200, 0);
      nativeElement.dispatchEvent(touchMoveEvent);
      
      const transform = nativeElement.style.transform;
      expect(transform).toContain('translateX(50px)');
      expect(transform).toContain('rotate(1.5deg)'); // 50 * 0.03 = 1.5
    });
    
    it('should not transform if not dragging', () => {
      // Skip touchstart and set isDragging to false manually
      directive['isDragging'] = false;
      
      // Try to move
      const touchMoveEvent = createTouchEvent('touchmove', 200, 0);
      nativeElement.dispatchEvent(touchMoveEvent);
      
      expect(nativeElement.style.transform).toBeFalsy();
    });
    
    it('should reset transform on touchend', () => {
      // Start touch
      const touchStartEvent = createTouchEvent('touchstart', 150, 0);
      nativeElement.dispatchEvent(touchStartEvent);
      
      // Move touch
      const touchMoveEvent = createTouchEvent('touchmove', 200, 0);
      nativeElement.dispatchEvent(touchMoveEvent);
      
      // End touch
      const touchEndEvent = createTouchEvent('touchend', 200, 0);
      nativeElement.dispatchEvent(touchEndEvent);
      
      expect(nativeElement.style.transform).toEqual('none');
      expect(directive['isDragging']).toBeFalse();
    });
    
    it('should emit swipeRight when threshold is exceeded in positive direction', () => {
      // Spy on the output event
      const swipeRightSpy = spyOn(component, 'onSwipeRight');
      
      // Start touch
      const touchStartEvent = createTouchEvent('touchstart', 100, 0);
      nativeElement.dispatchEvent(touchStartEvent);
      
      // End touch with large positive movement (> threshold)
      const touchEndEvent = createTouchEvent('touchend', 250, 0); // 150px difference, threshold is 100
      nativeElement.dispatchEvent(touchEndEvent);
      
      expect(swipeRightSpy).toHaveBeenCalled();
    });
    
    it('should emit swipeLeft when threshold is exceeded in negative direction', () => {
      // Spy on the output event
      const swipeLeftSpy = spyOn(component, 'onSwipeLeft');
      
      // Start touch
      const touchStartEvent = createTouchEvent('touchstart', 250, 0);
      nativeElement.dispatchEvent(touchStartEvent);
      
      // End touch with large negative movement (< -threshold)
      const touchEndEvent = createTouchEvent('touchend', 100, 0); // -150px difference
      nativeElement.dispatchEvent(touchEndEvent);
      
      expect(swipeLeftSpy).toHaveBeenCalled();
    });
    
    it('should not emit events when movement is less than threshold', () => {
      // Spy on both output events
      const swipeLeftSpy = spyOn(component, 'onSwipeLeft');
      const swipeRightSpy = spyOn(component, 'onSwipeRight');
      
      // Start touch
      const touchStartEvent = createTouchEvent('touchstart', 150, 0);
      nativeElement.dispatchEvent(touchStartEvent);
      
      // End touch with small movement (< threshold)
      const touchEndEvent = createTouchEvent('touchend', 180, 0); // 30px difference
      nativeElement.dispatchEvent(touchEndEvent);
      
      expect(swipeLeftSpy).not.toHaveBeenCalled();
      expect(swipeRightSpy).not.toHaveBeenCalled();
    });
  });
  
  describe('Mouse events', () => {
    it('should track mousedown position', () => {
      const mouseDownEvent = createMouseEvent('mousedown', 150);
      nativeElement.dispatchEvent(mouseDownEvent);
      
      expect(directive['startX']).toEqual(150);
      expect(directive['isDragging']).toBeTrue();
    });
    
    it('should update element transform on mousemove', () => {
      // First start the drag
      const mouseDownEvent = createMouseEvent('mousedown', 150);
      nativeElement.dispatchEvent(mouseDownEvent);
      
      // Then move
      const mouseMoveEvent = createMouseEvent('mousemove', 200);
      nativeElement.dispatchEvent(mouseMoveEvent);
      
      const transform = nativeElement.style.transform;
      expect(transform).toContain('translateX(50px)');
      expect(transform).toContain('rotate(1.5deg)'); // 50 * 0.03 = 1.5
    });
    
    it('should not transform if not dragging during mousemove', () => {
      // Skip mousedown and set isDragging to false manually
      directive['isDragging'] = false;
      
      // Try to move
      const mouseMoveEvent = createMouseEvent('mousemove', 200);
      nativeElement.dispatchEvent(mouseMoveEvent);
      
      expect(nativeElement.style.transform).toBeFalsy();
    });
    
    it('should reset transform on mouseup', () => {
      // Start drag
      const mouseDownEvent = createMouseEvent('mousedown', 150);
      nativeElement.dispatchEvent(mouseDownEvent);
      
      // Move
      const mouseMoveEvent = createMouseEvent('mousemove', 200);
      nativeElement.dispatchEvent(mouseMoveEvent);
      
      // End drag
      const mouseUpEvent = createMouseEvent('mouseup', 200);
      nativeElement.dispatchEvent(mouseUpEvent);
      
      expect(nativeElement.style.transform).toEqual('none');
      expect(directive['isDragging']).toBeFalse();
    });
    
    it('should emit swipeRight when threshold is exceeded in positive direction', () => {
      // Spy on the output event
      const swipeRightSpy = spyOn(component, 'onSwipeRight');
      
      // Start drag
      const mouseDownEvent = createMouseEvent('mousedown', 100);
      nativeElement.dispatchEvent(mouseDownEvent);
      
      // End drag with large positive movement (> threshold)
      const mouseUpEvent = createMouseEvent('mouseup', 250); // 150px difference, threshold is 100
      nativeElement.dispatchEvent(mouseUpEvent);
      
      expect(swipeRightSpy).toHaveBeenCalled();
    });
    
    it('should emit swipeLeft when threshold is exceeded in negative direction', () => {
      // Spy on the output event
      const swipeLeftSpy = spyOn(component, 'onSwipeLeft');
      
      // Start drag
      const mouseDownEvent = createMouseEvent('mousedown', 250);
      nativeElement.dispatchEvent(mouseDownEvent);
      
      // End drag with large negative movement (< -threshold)
      const mouseUpEvent = createMouseEvent('mouseup', 100); // -150px difference
      nativeElement.dispatchEvent(mouseUpEvent);
      
      expect(swipeLeftSpy).toHaveBeenCalled();
    });
    
    it('should not emit events when movement is less than threshold', () => {
      // Spy on both output events
      const swipeLeftSpy = spyOn(component, 'onSwipeLeft');
      const swipeRightSpy = spyOn(component, 'onSwipeRight');
      
      // Start drag
      const mouseDownEvent = createMouseEvent('mousedown', 150);
      nativeElement.dispatchEvent(mouseDownEvent);
      
      // End drag with small movement (< threshold)
      const mouseUpEvent = createMouseEvent('mouseup', 180); // 30px difference
      nativeElement.dispatchEvent(mouseUpEvent);
      
      expect(swipeLeftSpy).not.toHaveBeenCalled();
      expect(swipeRightSpy).not.toHaveBeenCalled();
    });
    
    it('should reset transform and isDragging when mouse leaves element', () => {
      // Start drag
      const mouseDownEvent = createMouseEvent('mousedown', 150);
      nativeElement.dispatchEvent(mouseDownEvent);
      
      // Move mouse
      const mouseMoveEvent = createMouseEvent('mousemove', 200);
      nativeElement.dispatchEvent(mouseMoveEvent);
      
      // Mouse leaves
      const mouseLeaveEvent = new MouseEvent('mouseleave');
      nativeElement.dispatchEvent(mouseLeaveEvent);
      
      expect(nativeElement.style.transform).toEqual('none');
      expect(directive['isDragging']).toBeFalse();
    });
    
    it('should do nothing on mouseleave if not dragging', () => {
      // Set transform to something we can check
      nativeElement.style.transform = 'translateX(50px)';
      
      // Set isDragging to false
      directive['isDragging'] = false;
      
      // Mouse leaves
      const mouseLeaveEvent = new MouseEvent('mouseleave');
      nativeElement.dispatchEvent(mouseLeaveEvent);
      
      // Transform should remain unchanged
      expect(nativeElement.style.transform).toEqual('translateX(50px)');
    });
  });
  
  // Helper functions to create events
  function createTouchEvent(type: string, clientX: number, clientY: number): TouchEvent {
    const touchObj = new Touch({
      identifier: Date.now(),
      target: nativeElement,
      clientX,
      clientY,
      pageX: clientX,
      pageY: clientY,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5,
    });
    
    return new TouchEvent(type, {
      cancelable: true,
      bubbles: true,
      touches: type !== 'touchend' ? [touchObj] : [],
      targetTouches: type !== 'touchend' ? [touchObj] : [],
      changedTouches: [touchObj],
    });
  }
  
  function createMouseEvent(type: string, clientX: number): MouseEvent {
    return new MouseEvent(type, {
      clientX,
      clientY: 0,
      bubbles: true,
      cancelable: true,
    });
  }
});