import { NgModule } from '@angular/core';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    declarations: [
        BreadcrumsComponent,
        HeaderComponent,
        PagenotfoundComponent,
        SidebarComponent,
        ModalUploadComponent
    ],
    imports: [RouterModule, CommonModule, PipesModule],
    exports: [
        BreadcrumsComponent,
        HeaderComponent,
        PagenotfoundComponent,
        SidebarComponent,
        ModalUploadComponent
    ],
    providers: []
})
export class SharedModule {}
