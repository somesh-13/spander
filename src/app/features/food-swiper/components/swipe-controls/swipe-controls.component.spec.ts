import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeControlsComponent } from './swipe-controls.component';

describe('SwipeControlsComponent', () => {
  let component: SwipeControlsComponent;
  let fixture: ComponentFixture<SwipeControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwipeControlsComponent]
    });
    fixture = TestBed.createComponent(SwipeControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
