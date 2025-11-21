import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Auth } from './features/auth/auth';
import { Dashboard } from './features/dashboard/dashboard';
import { Home } from './features/home/home';
import { Meeting } from './features/meeting/meeting';
import { Search } from './features/search/search';
import { Menu } from './features/menu/menu';
import { NewMeeting } from './features/new-meeting/new-meeting';

import { UserGuard } from './guards/user.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', component: Auth },

  {
    path: 'nova-pauta',
    component: Dashboard,
    canActivate: [UserGuard, RoleGuard],
    data: { roles: ['chefia'] }
  },

  { path: 'home', component: Home },
  { path: 'meeting', component: Meeting },
  { path: 'search', component: Search },
  { path: 'menu', component: Menu },

  {
    path: 'new-meeting',
    component: NewMeeting,
    canActivate: [UserGuard, RoleGuard],
    data: { roles: ['chefia'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
