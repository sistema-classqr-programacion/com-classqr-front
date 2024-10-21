import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAllModule } from './modules/material-all.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialAllModule
  ],
  exports: [MaterialAllModule, HttpClientModule]
})
export class SharedModule { }
