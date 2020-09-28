import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreferenceComponent } from './user/preference/preference.component';

const routes: Routes = [
  { path: '', component: PreferenceComponent } // TODO add guard to get user
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
