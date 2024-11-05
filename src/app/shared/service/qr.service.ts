import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { environment } from '@env/environment';
import { GenerarQr } from '@sharedModule/models/GenerarQr';
import { QueryQr } from '@sharedModule/models/QueryQr';


@Injectable({providedIn: 'root'})
export class QrService {
    
    constructor(private httpClient: HttpClient) { }

    public generarQr(queryQr:QueryQr): Observable<GenerarQr> {
        return this.httpClient.post<GenerarQr>(`${environment.api.baseUrlAPI}${environment.api.getQr}`, queryQr);
    }
}
