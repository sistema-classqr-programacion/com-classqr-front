import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { api } from '@env/api';
import { RespuestaIpPublica } from '@sharedModule/models/RespuestaIpPublica';


@Injectable({providedIn: 'root'})
export class IpPublicaService {
    
    private ipApiUrl = api.getIpPublica;

    constructor(private httpClient: HttpClient) { }

    obtenerIpPublica(): Observable<RespuestaIpPublica> {
        return this.httpClient.get<RespuestaIpPublica>(this.ipApiUrl).pipe(
            catchError((err) => {
              console.error('Error obteniendo IP pública:', err);
              let respuesta:RespuestaIpPublica = {
                ip: null
              }
              return of(respuesta); // Devuelve un objeto válido con IP nula
            })
          );
    }
}
