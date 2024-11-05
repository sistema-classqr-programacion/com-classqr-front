import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { environment } from '@env/environment';
import { Asistencia } from '@sharedModule/models/Asistencia';


@Injectable({providedIn: 'root'})
export class AsistenciaService {
    
    constructor(private httpClient: HttpClient) { }

    public guardarAsistencia(asistencia:Asistencia): Observable<RespuestaGeneral> {
        return this.httpClient.post<RespuestaGeneral>(`${environment.api.baseUrlAPI}${environment.api.postSaveAsistencia}`,asistencia);
    }

    public asistenciaBuscarTodas():Observable<RespuestaGeneral> {
        return this.httpClient.get<RespuestaGeneral> (`${environment.api.baseUrlAPI}${environment.api.getAsistenciaBuscarTodas}`);
    }

}
