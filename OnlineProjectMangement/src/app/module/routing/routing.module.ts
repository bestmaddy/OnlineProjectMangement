import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingRoutingModule } from './routing-routing.module';
import { CreateProjectComponent } from 'src/app/create-project/create-project.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { NavComponent } from 'src/app/nav/nav.component';
import { ProjectComponent } from 'src/app/project/project.component';
import { SearchFilterPipe } from 'src/app/search-filter.pipe';
import { CanvasJSChart } from 'src/assets/canvasjs.angular.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeComponent } from 'src/app/employee/employee.component';
import { OrderByPipe } from 'src/app/pipes/orderByPipe';
import { ProductComponent } from 'src/app/product/product.component';


@NgModule({
  declarations: [
    ProjectComponent,
    DashboardComponent,
    CreateProjectComponent,
    LayoutComponent,
    NavComponent,
    ProductComponent,
    SearchFilterPipe,
    EmployeeComponent,
    CanvasJSChart,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    RoutingRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    // BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class RoutingModule { }
