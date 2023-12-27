import { Routes } from '@angular/router';
import { FrontDoorComponent } from './pages/front-door/front-door.component';
import { AuthGuard } from './guards/auth.guard'
import { HouseAuthGuard } from './guards/auth.house.guard';
import { PetsAuthGuard } from './guards/auth.pets.guard';

export const routes: Routes = [
    { path: '', component: FrontDoorComponent },
    {
        path: 'house-door',
        loadChildren: () =>
            import('./pages/house-door/house-door-routing.module').then(
                (m) => m.HouseDoorRoutingModule
            ), canActivate: [AuthGuard]
    },
    {
        path: 'pets-door',
        loadChildren: () =>
            import('./pages/pets-door/pets-door-routing.module').then(
                (m) => m.PetsDoorRoutingModule
            ), canActivate: [HouseAuthGuard]
    },
    {
        path: 'cats-room',
        loadChildren: () =>
            import('./pages/cats-room/cats-room-routing.module').then(
                (m) => m.CatsRoomRoutingModule
            ), canActivate: [PetsAuthGuard]
    },
    { path: '**', redirectTo: '' }
];
