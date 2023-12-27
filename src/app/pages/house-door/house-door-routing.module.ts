import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseDoorComponent } from './house-door.component';


const routes: Routes = [
  { path: '', component: HouseDoorComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseDoorRoutingModule { }