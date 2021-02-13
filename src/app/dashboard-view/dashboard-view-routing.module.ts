import { DashboardComponent } from './dashboard.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeAdminComponent } from './recofinement/home-admin/home-admin.component';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileManagementComponent } from './recofinement/profile-management/profile-management.component';

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
            canActivate: [AuthGuard]
          },
          {
            path: 'profile/manage',
            component: ProfileManagementComponent,
            canActivate: [AuthGuard]
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
