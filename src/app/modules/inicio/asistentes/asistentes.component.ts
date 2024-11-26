import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Estudiante } from '@sharedModule/models/Estudiante';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { CursoEstudianteService } from '@sharedModule/service/curso-estudiante.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';
import { CargaEstudianteDialogComponent } from '../carga-estudiante-dialog/carga-estudiante-dialog.component';
import { CargaEstudianteFormDialogComponent } from '../carga-estudiante-form-dialog/carga-estudiante-form-dialog.component';
import { CambiarEstadoDialogComponent } from '../cambiar-estado-dialog/cambiar-estado-dialog.component';
import { Asistencia } from '@sharedModule/models/Asistencia';
import { jwtDecode } from 'jwt-decode';
import { AsistenciaService } from '@sharedModule/service/asistencia.service';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.component.html',
  styleUrls: ['./asistentes.component.scss'],
})
export class AsistentesComponent implements OnInit {
  page = 1; // Página actual
  pageSize = 10; // Tamaño de página
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'codigo-estudiante', 'asistio', 'noAsistio']; // Columnas de la tabla
  estudiantes: Estudiante[] = []; // Datos de estudiantes

  constructor(
    private cursoEstudianteService: CursoEstudianteService,
    private utilitiesService: UtilitiesService,
    private subject: SubjectService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private asistenciaService:AsistenciaService
  ) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  /**
   * Carga la lista de estudiantes para el curso seleccionado.
   */
  cargarEstudiantes(): void {
    this.spinner.show();
    const codigoCurso = this.subject.getValue();
    this.cursoEstudianteService
      .consultarEstudiantesCurso(codigoCurso)
      .pipe(
        tap((respuesta: RespuestaGeneral) => {
          this.estudiantes = respuesta.data as Estudiante[];
        }),
        catchError((error) => {
          console.error('Error al cargar estudiantes:', error);
          this.utilitiesService.showErrorMessage(error.message);
          return of(null);
        }),
        finalize(() => this.spinner.hide())
      )
      .subscribe();
  }

  /**
   * Maneja el evento de cambio de página.
   */
  onPageChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  /**
   * Abre el diálogo para cargar estudiantes desde un archivo Excel.
   */
  cargarEstudiantesExcel(): void {
    const dialogRef = this.dialog.open(CargaEstudianteDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado:', result);
    });
  }

  /**
   * Abre el formulario para cargar estudiantes manualmente.
   */
  cargarEstudiantesFormulario(): void {
    const dialogRef = this.dialog.open(CargaEstudianteFormDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado:', result);
    });
  }

  openDialog(estudiante: Estudiante): void {
    this.dialog.open(CambiarEstadoDialogComponent, {
      width: '400px',
      data: estudiante
    }).afterClosed().subscribe((result) => {
      if(result['status'] === "asisitio" && !estudiante.asistio){
        this.spinner.show()
        const token = sessionStorage.getItem("userToken")
        const codigoQr = sessionStorage.getItem("codigoQr")
        let  tokenSession = ''
        if(token){
          tokenSession = jwtDecode(token)
        }
        let codigoProfesor = ''
        if(tokenSession && typeof tokenSession ==  'object' && 'codigoProfesor' in tokenSession){
          codigoProfesor = tokenSession['codigoProfesor']
        } 
        let asistencia:Asistencia = {
          codigoEstudianteFk: {
            codigoEstudiante: estudiante.codigoEstudiante
          },
          codigoProfesorFk: {
            codigoProfesor: codigoProfesor
          },
          codigoCursoFk: {
            codigoCurso: this.subject.getValue()
          },
          codigoQrFk: {
            codigoQr: codigoQr!
          },
          fechaAsistencia: new Date
        }
        this.asistenciaService.guardarAsistencia(asistencia).pipe(
          tap((data) => {
          }),
          catchError((err) => {
            console.error("Error: ", err);
            this.utilitiesService.showErrorMessage(err.message);
            this.spinner.hide();
            return of(null);
          }),
          finalize(() => {
            this.spinner.hide()
          })
        ).subscribe()
      }else if(result['status'] === "noAsisitio" && estudiante.asistio){
        this.spinner.show()
        const token = sessionStorage.getItem("userToken")
        let  tokenSession = ''
        if(token){
          tokenSession = jwtDecode(token)
        }
        let codigoProfesor = ''
        if(tokenSession && typeof tokenSession ==  'object' && 'codigoProfesor' in tokenSession){
          codigoProfesor = tokenSession['codigoProfesor']
        } 
        let asistencia:Asistencia = {
          codigoEstudianteFk: {
            codigoEstudiante: estudiante.codigoEstudiante
          },
          codigoProfesorFk: {
            codigoProfesor: codigoProfesor
          },
          codigoCursoFk: {
            codigoCurso: this.subject.getValue()
          },
          fechaAsistencia: new Date
        }
        this.asistenciaService.eliminarAsistencia(asistencia).pipe(
          tap((data) => {
          }),
          catchError((err) => {
            console.error("Error: ", err);
            this.utilitiesService.showErrorMessage(err.message);
            this.spinner.hide();
            return of(null);
          }),
          finalize(() => {
            this.spinner.hide()
          })
        ).subscribe()
      }
    });

  }

}
