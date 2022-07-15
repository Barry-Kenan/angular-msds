import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/modules/login/components/login.components/login.component';
import { TableComponent } from 'src/modules/table/components/table.component/table.component';
import { AuthGuard } from './guards/auth.guard/auth.guard';
import { NewPassportFormComponent } from '../modules/new-passport-form/components/new-passport-form.component/new-passport-form.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: NewPassportFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
