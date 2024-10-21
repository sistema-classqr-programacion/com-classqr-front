import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sharedModule/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@sharedModule/service/auth.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { AsistenciaComponent } from './asistencia.component';
import { ASISTENCIA_ROUTES } from './asistencia.routes';



@NgModule({
  declarations: [
    AsistenciaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(ASISTENCIA_ROUTES),
  ],
  providers: [AuthService, ErrorHandlerService, UtilitiesService]
})
export class AsistenciaModule { }
