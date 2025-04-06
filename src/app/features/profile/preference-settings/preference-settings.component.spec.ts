import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceSettingsComponent } from './preference-settings.component';

describe('PreferenceSettingsComponent', () => {
  let component: PreferenceSettingsComponent;
  let fixture: ComponentFixture<PreferenceSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenceSettingsComponent]
    });
    fixture = TestBed.createComponent(PreferenceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
