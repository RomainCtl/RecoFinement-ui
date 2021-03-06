import { AdminGuard } from './../auth/admin.guard';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeAdminComponent } from './recofinement/home-admin/home-admin.component';
import { ProfileAdminComponent } from './recofinement/profile-admin/profile-admin.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    {
        path: 'admin',
        component: DashboardComponent,
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          {
            path:'home',
            component: HomeAdminComponent,
            canActivate: [AuthGuard, AdminGuard]
          },
          {
            path: 'profile',
            component: ProfileAdminComponent,
            canActivate: [AuthGuard, AdminGuard]
          },
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
