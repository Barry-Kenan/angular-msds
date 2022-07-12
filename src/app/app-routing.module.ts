import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NewPassportFormComponent } from './form/new-passport-form/new-passport-form.component';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: NewPassportFormComponent, canActivate: [AuthGuard] },
  { path: 'table', component: TableComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
