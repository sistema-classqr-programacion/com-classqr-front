import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { environment } from '@env/environment';
import { AutenticationToken } from '@sharedModule/models/AutenticationToken';
import { LoginProfesor } from '@sharedModule/models/LoginProfesor';


@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private httpClient: HttpClient) { }

    public loginProfesor(login:LoginProfesor): Observable<RespuestaGeneral>{
        return this.httpClient.post<RespuestaGeneral>(`${environment.api.baseUrlAPI}${environment.api.getAuthProfesor}`, login);
    }

    public validateToken(objeto:AutenticationToken): Observable<RespuestaGeneral> {
        return this.httpClient.post<RespuestaGeneral>(`${environment.api.baseUrlAPI}${environment.api.postAutentication}`, objeto)
    }
}
