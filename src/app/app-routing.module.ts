import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CanActivateGuard } from './can-activate.guard';
import { CreatorProfileComponent } from './creator-profile/creator-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: CreatorProfileComponent, canActivate: [CanActivateGuard] },
  { path: 'profile/:userId', component: CreatorProfileComponent, canActivate: [CanActivateGuard] },
  { path: '', component: HomeComponent, canActivate: [CanActivateGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
