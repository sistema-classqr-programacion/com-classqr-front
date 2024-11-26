import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sharedModule/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@sharedModule/service/auth.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { PANTALLA_QR } from './inicio.routes';
import { PantallaQrComponent } from './pantalla-qr/pantalla-qr.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AsistenciaComponent } from '../asistencia/asistencia.component';
import { AsistentesComponent } from './asistentes/asistentes.component';
import { InicioComponent } from './inicio.component';
import { HeaderModule } from '../header/header.module';
import { CargaEstudianteDialogComponent } from './carga-estudiante-dialog/carga-estudiante-dialog.component';
import { CargaEstudianteFormDialogComponent } from './carga-estudiante-form-dialog/carga-estudiante-form-dialog.component';
import { CambiarEstadoDialogComponent } from './cambiar-estado-dialog/cambiar-estado-dialog.component';


@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    RouterModule.forChild(PANTALLA_QR)
  ],
  declarations: [PantallaQrComponent, AsistentesComponent, InicioComponent, CargaEstudianteDialogComponent, CargaEstudianteFormDialogComponent, CambiarEstadoDialogComponent],
  providers: [AuthService, ErrorHandlerService, UtilitiesService]
})
export class InicioModule { }
