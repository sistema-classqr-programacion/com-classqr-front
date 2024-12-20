import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { environment } from '@env/environment';
import { LoginEstudiante } from '@sharedModule/models/LoginEstudiante';


@Injectable({providedIn: 'root'})
export class EstudianteService {
    
    constructor(private httpClient: HttpClient) { }

    public authEstudiatnte(objeto:LoginEstudiante): Observable<RespuestaGeneral> {
        return this.httpClient.post<RespuestaGeneral>(`${environment.api.baseUrlAPI}${environment.api.gettLoginEstudiante}`,objeto);
    }

    public validarIpEstudiante(ipEstudiante:string): Observable<RespuestaGeneral> {
        const params = new HttpParams().set('ip', ipEstudiante)
        return this.httpClient.get<RespuestaGeneral>(`${environment.api.baseUrlAPI}${environment.api.getValidarIp}`,{params});
    }

}
