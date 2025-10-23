import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { Home } from './features/home/home';
import { Auth } from './features/auth/auth';
import { Dashboard } from './features/dashboard/dashboard';
import { Meeting } from './features/meeting/meeting';
import { Search } from './features/search/search';
import { Header } from './components/header/header';
import { AccordionItem } from './components/accordion-item/accordion-item';
import { RadioButtonComponent } from './components/radio-field/radio-field';
import { NgOptimizedImage } from '@angular/common';
import { MenuHeader } from './components/menu-header/menu-header';
import { MenuComponent } from './components/menu-component/menu-component';

@NgModule({
  declarations: [
    App,
    Home,
    Auth,
    Dashboard,
    Meeting,
    Search,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Header,
    AccordionItem,
    RadioButtonComponent,
    NgOptimizedImage,
    MenuHeader,
    MenuComponent,
  ],
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
