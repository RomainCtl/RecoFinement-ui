import { DashboardComponent } from './dashboard.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../auth/auth.guard';
import { AddMediaComponent } from './recofinement/add-media/add-media.component';
import { ProfileManagementComponent } from './recofinement/profile-management/profile-management.component';

const routes: Routes = [
    {
        path: 'admin',
        component: DashboardComponent,
        children: [
          {
            path: 'media/add',
            component: AddMediaComponent,
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
