import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSharedModule } from '../common/common-shared-module';
import { ConsoleComponent } from './console/console.component';



@NgModule({
  declarations: [
    ConsoleComponent
  ],
  imports: [
    CommonModule,
    CommonSharedModule
  ],
  exports: [
    ConsoleComponent
  ]
})
export class MainModule { }
