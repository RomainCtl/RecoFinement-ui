import { DashboardComponent } from './dashboard.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: 'admin',
        component: DashboardComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class RecoDashboardRoutingModule { }