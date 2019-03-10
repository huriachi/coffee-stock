import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'flavours', loadChildren: './pages/flavours/flavours.module#FlavoursPageModule' },
  { path: 'manage-flavours', loadChildren: './pages/manage-flavours/manage-flavours.module#ManageFlavoursPageModule' },
  { path: 'manage-flavours/:id', loadChildren: './pages/manage-flavours/manage-flavours.module#ManageFlavoursPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
