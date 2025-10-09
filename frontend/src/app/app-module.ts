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

@NgModule({
  declarations: [
    App,
    Home,
    Auth,
    Dashboard,
    Meeting,
    Search
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
