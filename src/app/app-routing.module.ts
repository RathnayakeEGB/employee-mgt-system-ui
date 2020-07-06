import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpMgtComponent } from './emp-mgt/emp-mgt.component';


const routes: Routes = [
  {

    path :'' ,component:EmpMgtComponent


  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
