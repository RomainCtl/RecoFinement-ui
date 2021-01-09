import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RecoDashboardRoutingModule } from './dashboard-view-routing.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [DashboardComponent, LoginComponent],
  imports: [
    RouterModule,
    CommonModule,
    RecoDashboardRoutingModule
  ]
})
export class RecoDashboardModule { }
