import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatorService } from './services/translator.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    FormsModule
  ],
  providers: [
    TranslatorService
  ]
})
export class CommonSharedModule { }
