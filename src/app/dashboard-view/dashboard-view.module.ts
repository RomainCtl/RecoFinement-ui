import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RecoDashboardRoutingModule } from './dashboard-view-routing.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ProfileManagementComponent } from './recofinement/profile-management/profile-management.component';
import { MenuComponent } from './recofinement/menu/menu.component';
import { HomeAdminComponent } from './recofinement/home-admin/home-admin.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileAdminComponent } from './recofinement/profile-admin/profile-admin.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    HomeAdminComponent,
    ProfileAdminComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    RecoDashboardRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule
  ]
})
export class RecoDashboardModule { }
