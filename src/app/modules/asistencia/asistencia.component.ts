import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Asistencia } from '@sharedModule/models/Asistencia';
import { AuthResponse } from '@sharedModule/models/AuthResponse';
import { EstudianteTokenData } from '@sharedModule/models/EstudianteTokenData';
import { LoginEstudiante } from '@sharedModule/models/LoginEstudiante';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { RespuestaIpPublica } from '@sharedModule/models/RespuestaIpPublica';
import { AsistenciaService } from '@sharedModule/service/asistencia.service';
import { EstudianteService } from '@sharedModule/service/estudiante.service';
import { IpPublicaService } from '@sharedModule/service/ip-publica.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, concatMap, finalize, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {
  public formAsistencia!: FormGroup;
  private codigoEstudiante: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private estudianteService: EstudianteService,
    private spinner: NgxSpinnerService,
    private utilitiesService: UtilitiesService,
    private subjectService: SubjectService,
    private ipPublicaService: IpPublicaService,
    private asistenciaService: AsistenciaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const token = this.subjectService.getValueToken(); // Obtener el token de la URL
    sessionStorage.setItem('userToken', token)
    this.buildAsistenciaForm();
  }

  /**
   * Construye el formulario de asistencia.
   */
  private buildAsistenciaForm(): void {
    this.formAsistencia = this.formBuilder.group({
      codigoEstudiante: new FormControl<string>('', Validators.required),
      numeroDocumento: new FormControl('', Validators.required)
    });
  }

  /**
   * Realiza el login del estudiante, procesa el token y sigue con el flujo de asistencia.
   */
  loginEstudiante(): void {
    if (this.formAsistencia.invalid) {
      this.utilitiesService.showErrorMessage('Por favor complete todos los campos requeridos.');
      return;
    }

    const loginData: LoginEstudiante = this.formAsistencia.value;
    this.spinner.show();

    this.estudianteService.authEstudiatnte(loginData).pipe(
      tap((response: RespuestaGeneral) => {
        const token = response.data as AuthResponse;
        const estudianteData: EstudianteTokenData = jwtDecode(token.token);
        this.codigoEstudiante = estudianteData.codigoEstudiante;
        this.processAsistencia()
      }),
      catchError((err) => {
        console.log(err)
        this.utilitiesService.showErrorMessage(err.message || 'Error al autenticar al estudiante.');
        this.spinner.hide()
        return of(null);
      }),
      finalize(() => {
      })
    ).subscribe();
  }

  /**
   * Procesa los datos de asistencia verificando la IP pública.
   */
  private processAsistencia(): void {
    const codigoQr = this.subjectService.getValue() || '';

    this.ipPublicaService.obtenerIpPublica().pipe(
      tap((data) => {
        if (data.ip) {
          const ipPublica = Array(4)
          .fill(0)
          .map(() => Math.floor(Math.random() * 256)) // Número entre 0 y 255
          .join('.');
          console.log(codigoQr)
          const asistencia: Asistencia = this.createAsistenciaObject(codigoQr, ipPublica);
          this.saveAsistencia(asistencia); // Guarda la asistencia si todo es correcto
        } else {
          this.utilitiesService.showErrorMessage('No se pudo obtener la IP pública.');
          throw new Error('No se pudo obtener la IP pública.');
        }
      }),
      catchError((err:RespuestaGeneral) => {
        console.log(err)
        this.utilitiesService.showErrorMessage(err.message || 'Error obteniendo la IP pública.');
        let respuesta:RespuestaIpPublica = {
          ip:null
        }
        this.spinner.hide()
        return of(respuesta);
      })
    ).subscribe()
  }

  /**
   * Crea el objeto Asistencia.
   * @param codigoQr Código QR asociado.
   * @param ipPublica IP pública del estudiante.
   * @returns Objeto Asistencia.
   */
  private createAsistenciaObject(codigoQr: string, ipPublica: string): Asistencia {
    return {
      codigoEstudianteFk: { codigoEstudiante: this.codigoEstudiante },
      ipEstudiante: ipPublica,
      codigoQrFk: { codigoQr },
      fechaAsistencia: new Date()
    };
  }

  /**
   * Guarda la asistencia y redirige tras éxito.
   * @param asistencia Objeto Asistencia.
   */
  private saveAsistencia(asistencia: Asistencia): void {
    this.asistenciaService.guardarAsistencia(asistencia).pipe(
      tap(() => {
        this.utilitiesService.showInfoMessage('Se guardó correctamente la asistencia.');
        this.router.navigate(['/login']); // Redirige a la página de login
      }),
      catchError((err) => {
        console.log(err)
        this.utilitiesService.showErrorMessage(err.message || 'Error al guardar la asistencia.');
        this.spinner.hide()
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    ).subscribe();
  }
}
