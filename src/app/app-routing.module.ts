import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { DweetComponent } from './dweet/dweet.component';
import { SignupComponent } from './auth/signup.component';
import { UnAuthorizedComponenet } from './app-shared/components/unauthorized.component';
import { NotFoundComponent } from './app-shared/components/not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'dweets', component: DweetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'unauthorized', component: UnAuthorizedComponenet },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

