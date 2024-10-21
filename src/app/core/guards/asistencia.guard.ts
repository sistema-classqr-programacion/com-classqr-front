import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AsistenciaTokenData } from '@sharedModule/models/AsistenciaTokenData';
import { AutenticationToken } from '@sharedModule/models/AutenticationToken';
import { AuthService } from '@sharedModule/service/auth.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private utilitiesService: UtilitiesService,
    private subjectService: SubjectService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = route.queryParams['token']; // Obtener el token de la URL

    if (token) {
      try {
        const autentication = this.buildAuthenticationToken(token);
        
        // Validar el token llamando al backend
        return this.authService.validateToken(autentication).pipe(
          map(isValid => this.handleValidationResult(Boolean(isValid.data))),
          catchError(error => this.handleError('Error al validar el token', error))
        );
      } catch (error) {
        return this.handleError('Error decodificando el token', error);
      }
    } else {
      return this.handleError('Token no existente');
    }
  }

  /**
   * Construye el objeto de autenticación basado en el token decodificado.
   */
  private buildAuthenticationToken(token: string): AutenticationToken {
    const objeto: AsistenciaTokenData = jwtDecode(token);
    this.subjectService.setValueBase64(objeto.codigoAsistencia)
    return {
      token: token,
      asistenciaDTO: {
        codigoAsistencia: objeto.codigoAsistencia,
      }
    };
  }

  /**
   * Maneja el resultado de la validación del token.
   */
  private handleValidationResult(isValid: boolean): boolean {
    if (isValid) {
      return true; // Permitir el acceso si el token es válido
    } else {
      this.showErrorAndNavigate('El token no es validado');
      return false;
    }
  }

  /**
   * Muestra un mensaje de error y navega a la página de error.
   */
  private async showErrorAndNavigate(message: string): Promise<void> {
    await this.utilitiesService.showErrorMessage(message);
    this.router.navigate(['/qr']);
  }

  /**
   * Maneja errores durante el proceso de validación o decodificación.
   */
  private handleError(message: string, error?: any): Observable<boolean> {
    if (error) {
      console.error(message, error);
    }
    this.showErrorAndNavigate(message);
    return of(false);
  }
}
