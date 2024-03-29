import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from 'src/app/create-project/create-project.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { EmployeeComponent } from 'src/app/employee/employee.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { NavComponent } from 'src/app/nav/nav.component';
import { ProductComponent } from 'src/app/product/product.component';
import { ProjectComponent } from 'src/app/project/project.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'project', component: ProjectComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'create', component: CreateProjectComponent },
      { path: 'emp', component: EmployeeComponent },
      { path: 'product', component: ProductComponent },
      { path: '', redirectTo: './layout/dashboard', pathMatch: 'full' },
      { path: '**', component: DashboardComponent }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }
