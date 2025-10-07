import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './features/home/home';
import { Voting } from './features/voting/voting';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'votar', component: Voting }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
