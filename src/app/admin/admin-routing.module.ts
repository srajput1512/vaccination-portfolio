import { AuthGuardAdmin } from './../shared/guard/auth-admin.guard';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminLoginComponent
      },
      {
        path: 'employee-details',
        component: EmployeeDetailsComponent,
        canActivate: [AuthGuardAdmin]
      },
      {
        path: 'vaccination-details',
        component: VaccinationDetailsComponent,
        canActivate: [AuthGuardAdmin]
      }
    ],
  },
  {
    path: '**', pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
