import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { LoginComponent } from './components/login.components/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NzGridModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
  ],
})
export class LoginModule {}
