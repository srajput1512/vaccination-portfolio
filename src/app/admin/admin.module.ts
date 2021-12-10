import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchPipe } from './employee-details/search.pipe';
import { TableFilterPipe } from './employee-details/table-filter.pipe';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    EmployeeDetailsComponent,
    VaccinationDetailsComponent,
    NavbarComponent,
    SearchPipe,
    TableFilterPipe
  ],
  imports: [
    RouterModule,
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule {}
