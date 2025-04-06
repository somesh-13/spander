import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { PreferenceSettingsComponent } from './preference-settings/preference-settings.component';


@NgModule({
  declarations: [
    ProfileDetailsComponent,
    PreferenceSettingsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
