import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { environment } from '@env/environment';


@Injectable({providedIn: 'root'})
export class QrService {
    
    constructor(private httpClient: HttpClient) { }

    public generarQr(): Observable<Blob> {
        return this.httpClient.get(`${environment.api.baseUrlAPI}${environment.api.getQr}`,{ responseType: 'blob' });
    }
}
