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

@NgModule({
    declarations: [AppComponent, LoginComponent, RegisterComponent],
    imports: [
        BrowserModule,
        APP_ROUTES,
        PagesModule,
        FormsModule,
        ReactiveFormsModule,
        ServicesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
