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
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    ProjectComponent,
    DashboardComponent,
    CreateProjectComponent,
    LayoutComponent,
    NavComponent,
    SearchFilterPipe,
    CanvasJSChart,
  ],
  imports: [
    CommonModule,
    RoutingRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    // BrowserAnimationsModule,
    RouterModule
  ]
})
export class RoutingModule { }
