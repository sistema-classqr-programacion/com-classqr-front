import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@sharedModule/service/auth.service';
import { IpPublicaService } from '@sharedModule/service/ip-publica.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { EstudianteService } from '@sharedModule/service/estudiante.service';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { map, catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { Qr } from '@sharedModule/models/Qr';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private ipPublicaService: IpPublicaService,
    private utilitiesService: UtilitiesService,
    private subjectService: SubjectService,
    private estudianteService: EstudianteService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = route.queryParams['token']; // Obtener el token de la URL
    if (token) {
      sessionStorage.setItem('userToken', token);

      try {
        return this.ipPublicaService.obtenerIpPublica().pipe(
          switchMap((data) => {
            const ipPublica = data['ip'];

            // Validar la IP del estudiante
            return this.estudianteService.validarIpEstudiante(ipPublica!).pipe(
              map((respuesta) => {
                const isIpValid = Boolean(respuesta.data);
                if (isIpValid) {
                  this.showErrorAndNavigate('La IP del estudiante ya está registrada.');
                  return false; // Bloquear acceso
                }
                return true; // Continuar flujo
              }),
              catchError((err) => this.handleError('Error validando la IP del estudiante', err))
            );
          }),
          switchMap((canProceed) => {
            if (canProceed) {
              const autentication = this.buildAuthenticationToken(token);

              // Validar el token llamando al backend
              return this.authService.validateToken(autentication).pipe(
                map(isValid => this.handleValidationResult(Boolean(isValid.data))),
                catchError(error => this.handleError('Error al validar el token', error))
              );
            }
            return of(false);
          })
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
  private buildAuthenticationToken(token: string): any {
    const objeto:Qr = jwtDecode(token);
    this.subjectService.setValue(objeto.codigoQr);
    return {
      token: token,
      qrDTO: {
        codigoQr: objeto.codigoQr,
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
      this.showErrorAndNavigate('El token no es válido.');
      return false;
    }
  }

  /**
   * Muestra un mensaje de error y navega a la página de error.
   */
  private async showErrorAndNavigate(message: string): Promise<void> {
    await this.utilitiesService.showErrorMessage(message);
    this.router.navigate(['/otra-pagina']); // Cambia '/otra-pagina' por la ruta deseada
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
