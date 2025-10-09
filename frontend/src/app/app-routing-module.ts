import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Auth } from './features/auth/auth';
import { Dashboard } from './features/dashboard/dashboard';
import { Home } from './features/home/home';
import { Meeting } from './features/meeting/meeting';
import { Search } from './features/search/search';

const routes: Routes = [
  { path: '', component: Auth },
  { path: 'dashboard', component: Dashboard },
  { path: 'home', component: Home },
  { path: 'meeting', component: Meeting },
  { path: 'search', component: Search }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
