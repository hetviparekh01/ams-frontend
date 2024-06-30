import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'getuser',
    pathMatch:'full'
  },
  {
    path:'getuser',
    component:ViewUserComponent
  },
  {
    path:'adduser',
    component:AddUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
