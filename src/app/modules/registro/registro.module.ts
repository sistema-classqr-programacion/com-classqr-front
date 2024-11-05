import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sharedModule/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@sharedModule/service/auth.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { REGISTRO } from './registro.routes';
import { RegistroComponent } from './registro.component';



@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(REGISTRO),
  ],
  providers: [AuthService, ErrorHandlerService, UtilitiesService]
})
export class RegistroModule { }
