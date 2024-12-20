import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { environment } from '@env/environment';
import { Asistencia } from '@sharedModule/models/Asistencia';


@Injectable({providedIn: 'root'})
export class CursoProfesorService{

    constructor(private httpClient:HttpClient){}

    public consultarCursosProfesor(codigoProfesor:string): Observable<RespuestaGeneral>{
        const params = new HttpParams().set('codigoProfesor', codigoProfesor)
        return this.httpClient.get<RespuestaGeneral>(`${environment.api.baseUrlAPI}${environment.api.getCursosAsignadosProfesor}`,{params})
    }


}