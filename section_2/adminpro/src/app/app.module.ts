import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// MODULES
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // TEMP
import { ServicesModule } from './services/services.module';

// RUTAS
import { APP_ROUTES } from './app-routing.module';

// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        PagesComponent
    ],
    imports: [
        BrowserModule,
        APP_ROUTES,
        //PagesModule,
        FormsModule,
        ReactiveFormsModule,
        ServicesModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
