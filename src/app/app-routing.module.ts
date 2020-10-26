import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { ExamplePageComponent } from './pages/example-page/example-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShipComponent } from './pages/ship/ship.component';
import { ShipsComponent } from './pages/ships/ships.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'example-page', component: ExamplePageComponent, canActivate: [LoginGuard] },
  { path: 'ships', component: ShipsComponent, canActivate: [LoginGuard] },
  { path: 'ship/:idShip', component: ShipComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
