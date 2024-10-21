import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Asistencia } from '@sharedModule/models/Asistencia';
import { AuthResponse } from '@sharedModule/models/AuthResponse';
import { EstudianteTokenData } from '@sharedModule/models/EstudianteTokenData';
import { LoginEstudiante } from '@sharedModule/models/LoginEstudiante';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { AsistenciaService } from '@sharedModule/service/asistencia.service';
import { Base64Service } from '@sharedModule/service/base64.service';
import { EstudianteService } from '@sharedModule/service/estudiante.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export class AsistenciaComponent {

  public formAsistencia!:FormGroup;

  private codigoEstudiante:string = ''

  constructor(
    private formBuilder: FormBuilder,
    private estudianteService:EstudianteService,
    private spinner:NgxSpinnerService,
    private utilitiesService: UtilitiesService,
    private base64:Base64Service,
    private subjectService:SubjectService,
    private asistenciaService:AsistenciaService,
    private router: Router, 
  ){}


  ngOnInit(): void {
    this.buildAsistencia()
  }

  buildAsistencia(): void {
    this.formAsistencia = this.formBuilder.group({
      codigoEstudiante: new FormControl<string>('', [
        Validators.required, 
      ]
      ),
      numeroDocumento: new FormControl('', [
        Validators.required,
      ])
    });
  }

  loginEstudiante(){
    const {codigoEstudiante, numeroDocumento} = this.formAsistencia.value
    const loginEstudiante:LoginEstudiante = {
      numeroDocumento: numeroDocumento,
      codigoEstudiante: codigoEstudiante
    }
    this.spinner.show()
    this.estudianteService.authEstudiatnte(loginEstudiante).pipe(
      tap((objeto: RespuestaGeneral) => {
        const token:AuthResponse = objeto.data as AuthResponse;
        const estudianteData:EstudianteTokenData = jwtDecode(token.token);
        this.codigoEstudiante = estudianteData.codigoEstudiante;
      }),
      catchError((err) => {
        console.error("Error: ", err);
        this.utilitiesService.showErrorMessage(err.message);
        this.spinner.hide();
        return of(null);
      }),
      finalize(() => {
        console.log("continua con formatear")
        this.formatAsistencia()
      })
    ).subscribe()
  }

  formatAsistencia(){
    let asistencia:Asistencia = {
      codigoAsistencia: this.subjectService.getValue(),
      codigoEstudianteFk: {
        codigoEstudiante: this.codigoEstudiante
      },
      fechaAsistencia: new Date
    }
    this.saveAsistencia(asistencia)
  }

  saveAsistencia(asistencia:Asistencia){
    console.log("Comienza")
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
        this.utilitiesService.showInfoMessage("Se guardo correctamente la asistencia")
        this.spinner.hide()
        this.router.navigate(['/qr'])
      })
    ).subscribe()
  }

}
