import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularDependenciesModule } from '../common/angular-dependencies.module';
import { ConsoleComponent } from './console/console.component';



@NgModule({
  declarations: [
    ConsoleComponent
  ],
  imports: [
    CommonModule,
    AngularDependenciesModule
  ],
  exports: [
    ConsoleComponent
  ]
})
export class MainModule { }
