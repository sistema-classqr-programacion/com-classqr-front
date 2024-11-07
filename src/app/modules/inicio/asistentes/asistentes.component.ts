import { Component } from '@angular/core';
import { Curso } from '@sharedModule/models/Curso';
import { HttpError } from '@sharedModule/models/http-error';
import { ProfesorToken } from '@sharedModule/models/ProfesorToken';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { AsistenciaService } from '@sharedModule/service/asistencia.service';
import { CursoProfesorService } from '@sharedModule/service/curso-profesor.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.component.html',
  styleUrl: './asistentes.component.scss'
})
export class AsistentesComponent {

  constructor(
    private asistenciaService:AsistenciaService,
    private utilitiesService:UtilitiesService,
    private subject:SubjectService,
    private cursoProfesorService:CursoProfesorService,
    private spinner:NgxSpinnerService
  ){

  }

  selectedOption: string = '';
  cursos:Curso[] = [];

  // Datos simulados de ejemplo
  data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', asistio: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', asistio: false },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', asistio: true },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', asistio: true },
    { id: 5, name: 'Robert White', email: 'robert@example.com', asistio: true },
    { id: 6, name: 'Maria Green', email: 'maria@example.com', asistio: true },
    { id: 7, name: 'David Black', email: 'david@example.com', asistio: true },
    { id: 8, name: 'Sophia Blue', email: 'sophia@example.com', asistio: false },
    { id: 9, name: 'George Red', email: 'george@example.com', asistio: true },
    { id: 10, name: 'Grace Yellow', email: 'grace@example.com', asistio: true },
    { id: 11, name: 'Oliver Pink', email: 'oliver@example.com', asistio: false },
    { id: 12, name: 'Emma Purple', email: 'emma@example.com', asistio: true },
    { id: 13, name: 'Liam Gray', email: 'liam@example.com', asistio: true },
    { id: 14, name: 'Noah Silver', email: 'noah@example.com', asistio: false },
    { id: 15, name: 'Ava Gold', email: 'ava@example.com', asistio: true },
    { id: 16, name: 'Isabella Orange', email: 'isabella@example.com', asistio: true },
    { id: 17, name: 'Mason Blue', email: 'mason@example.com', asistio: true },
    { id: 18, name: 'Logan White', email: 'logan@example.com', asistio: true },
  ];
  
  // Configuración de paginación
  page = 1;           // Página actual
  pageSize = 10;       // Tamaño de página

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadData()
  }

  loadData():void {
    this.spinner.show();
    let token = sessionStorage.getItem('userToken')
    if(token){
      let profesorData:ProfesorToken = jwtDecode(token)
      this.cursoProfesorService.consultarCursosProfesor(profesorData.codigoProfesor).pipe(
        tap((data:RespuestaGeneral) => {
          this.cursos = data.data as Curso[]
        }),
        catchError((err:HttpError) => {
          console.error("Error pipe ", err)
          this.utilitiesService.showErrorMessage(err.message)
          this.spinner.hide()
          return of(null)
        }),
        finalize(() => {
          this.spinner.hide()
        })
      ).subscribe()
    }
  }

}
