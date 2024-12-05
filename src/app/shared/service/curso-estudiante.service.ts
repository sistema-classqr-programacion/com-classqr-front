import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { environment } from '@env/environment';
import { AdjuntarEstudianteCurso } from '@sharedModule/models/AdjuntarEstudianteCurso';


@Injectable({providedIn: 'root'})
export class CursoEstudianteService{

    constructor(private httpClient:HttpClient){}

    public consultarEstudiantesCurso(codigoCurso:string): Observable<RespuestaGeneral>{
        const params = new HttpParams().set('codigoCurso', codigoCurso)
        return this.httpClient.get<RespuestaGeneral>(`${environment.api.baseUrlAPI}${environment.api.getEstudiantesCurso}`,{params})
    }

    public cargarEstudianteCurso(data:AdjuntarEstudianteCurso): Observable<RespuestaGeneral>{
        return this.httpClient.post<RespuestaGeneral>(`${environment.api.baseUrlAPI}${environment.api.postCargarEstudianteCurso}`,data)
    }

    public cargarEstudianteCursoExcel(file:File, codigoCurso:string): Observable<RespuestaGeneral>{
        const formData = new FormData();
        formData.append('file', file);
        formData.append('codigoCurso', codigoCurso);
        return this.httpClient.post<RespuestaGeneral>(`${environment.api.baseUrlAPI}${environment.api.postCargarEstudianteCursoExcel}`,formData)
    }

}