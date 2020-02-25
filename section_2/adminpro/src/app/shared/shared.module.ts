import { NgModule } from '@angular/core';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        BreadcrumsComponent,
        HeaderComponent,
        PagenotfoundComponent,
        SidebarComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        BreadcrumsComponent,
        HeaderComponent,
        PagenotfoundComponent,
        SidebarComponent
    ],
    providers: [],
})
export class SharedModule {

}