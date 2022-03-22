import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { RegPageComponent } from './components/reg-page/reg-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthPageComponent },
  { path: 'reg', component: RegPageComponent },
  { path: 'board', component: BoardPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/auth' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
