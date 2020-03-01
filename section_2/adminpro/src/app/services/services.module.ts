import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    UploadFileService
} from './settings.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [
        SettingsService,
        SidebarService,
        SharedService,
        UserService,
        LoginGuard,
        AdminGuard,
        UploadFileService,
        ModalUploadService
    ]
})
export class ServicesModule {}
