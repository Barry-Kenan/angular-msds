import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationDirective } from './validation/validation.directive';

@NgModule({
  declarations: [ValidationDirective],
  imports: [CommonModule],
  exports: [ValidationDirective],
})
export class DirectivesModule {}
