import { Component, OnInit } from '@angular/core';
import { Curso } from '@sharedModule/models/Curso';
import { HttpError } from '@sharedModule/models/http-error';
import { ProfesorToken } from '@sharedModule/models/ProfesorToken';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { CursoProfesorService } from '@sharedModule/service/curso-profesor.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  template: `
    <ng-container *ngIf="headerLoaded">
      <app-header
        [cursos]="cursos"
        (cursoSeleccionado)="onCursoSeleccionado($event)"
      ></app-header>
      <router-outlet></router-outlet>
    </ng-container>
  `,
})
export class InicioComponent implements OnInit {
  cursos: Curso[] = [];
  headerLoaded = false;

  constructor(
    private cursoProfesorService: CursoProfesorService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
    private subject: SubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Carga los cursos asociados al profesor desde el token almacenado.
   */
  loadData(): void {
    const token = sessionStorage.getItem('userToken');
    if (!token) {
      this.utilitiesService.showErrorMessage('No se encontró el token.');
      return;
    }

    const profesorData: ProfesorToken = jwtDecode(token);

    this.spinner.show();
    this.cursoProfesorService
      .consultarCursosProfesor(profesorData.codigoProfesor)
      .pipe(
        tap((response: RespuestaGeneral) => {
          this.cursos = response.data as Curso[];
          if (this.cursos.length > 0) {
            const cursoInicial = this.cursos[0].codigoCurso;
            this.subject.setValue(cursoInicial!); // Establece el primer curso como seleccionado
            this.router.navigate(['/inicio/pantalla-qr'], { queryParams: { curso: cursoInicial } }); // Redirige a la ruta con el primer curso
          }
        }),
        catchError((error: HttpError) => {
          console.error('Error al cargar cursos: ', error);
          this.utilitiesService.showErrorMessage(error.message);
          return of(null);
        }),
        finalize(() => {
          this.headerLoaded = true;
          this.spinner.hide();
        })
      )
      .subscribe();
  }

  /**
   * Maneja el cambio de curso seleccionado desde el header
   */
  onCursoSeleccionado(codigoCurso: string): void {
    this.subject.setValue(codigoCurso); // Actualiza el valor en el Subject
    this.router.navigate(['/inicio/pantalla-qr']); // Redirige a la ruta con el curso seleccionado
  }
}
