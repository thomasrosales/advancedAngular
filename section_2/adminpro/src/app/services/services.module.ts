import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService } from './settings.index';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [SettingsService, SidebarService, SharedService],
})
export class ServicesModule { }
