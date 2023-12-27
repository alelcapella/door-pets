import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatsRoomComponent } from './cats-room.component';


const routes: Routes = [
  { path: '', component: CatsRoomComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsRoomRoutingModule { }