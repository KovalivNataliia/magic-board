import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { RegPageComponent } from './components/reg-page/reg-page.component';

const routes: Routes = [
  { path: 'auth', component: AuthPageComponent },
  { path: 'reg', component: RegPageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
