import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsDoorComponent } from './pets-door.component';


const routes: Routes = [
  { path: '', component: PetsDoorComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsDoorRoutingModule { }