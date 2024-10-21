import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sharedModule/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PantallaQrComponent } from './pantalla-qr.component';
import { AuthService } from '@sharedModule/service/auth.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { PANTALLA_QR } from './pantalla-qr.routes';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    PantallaQrComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(PANTALLA_QR),
  ],
  providers: [AuthService, ErrorHandlerService, UtilitiesService]
})
export class PantallaQrModule { }
