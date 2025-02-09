import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxParallaxModule } from '@yoozly/ngx-parallax';
import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
// Registra los datos del locale español
registerLocaleData(localeEs, 'es');

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NgxParallaxModule
    ),
    
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'en-US' }
  ],
  
}).catch((err) => console.error(err));
