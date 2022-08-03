import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/login/components/login.components/login.component';
import { TableComponent } from 'src/app/modules/table/components/table.component/table.component';
import { AuthGuard } from './guards/auth.guard/auth.guard';
import { FullPassportFormComponent } from './modules/full-passport-form/components/full-passport-form/full-passport-form.component';
import { NewPassportFormComponent } from './modules/new-passport-form/components/new-passport-form.component/new-passport-form.component';
/**
 * Роутинг
 */
const routes: Routes = [
  {
    path: '',
    component: TableComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: NewPassportFormComponent, canActivate: [AuthGuard] },
  { path: 'fullForm/:id', component: FullPassportFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
