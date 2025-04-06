import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeContainerComponent } from './swipe-container.component';

describe('SwipeContainerComponent', () => {
  let component: SwipeContainerComponent;
  let fixture: ComponentFixture<SwipeContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwipeContainerComponent]
    });
    fixture = TestBed.createComponent(SwipeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
