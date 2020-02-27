import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService, UserService } from './settings.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [SettingsService, SidebarService, SharedService, UserService],
})
export class ServicesModule { }
