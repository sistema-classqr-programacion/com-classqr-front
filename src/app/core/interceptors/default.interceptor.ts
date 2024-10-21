import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, finalize, map, timeout } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ISafeAny } from '@sharedModule/models/ISafeAny';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { HttpError } from '@sharedModule/models/http-error';

const APP_XHR_TIMEOUT = 120000;

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(private utilitiesService: UtilitiesService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.performRequest(req)).pipe(
      timeout(APP_XHR_TIMEOUT),
      map(res => this.handleSuccessfulResponse(res)),
      catchError(err => this.handleErrorResponse(err)),
      finalize(() => this.handleRequestCompleted())
    );
  }

  private performRequest(req: HttpRequest<ISafeAny>): HttpRequest<ISafeAny> {
    const headers = this.getUpdatedHeaders(req.headers);
    const url = this.getFullUrl(req.url);

    return req.clone({ url, setHeaders: headers });
  }

  private getUpdatedHeaders(headers: HttpHeaders): { [name: string]: string } {
    const token = sessionStorage.getItem('userToken');
    const updatedHeaders: { [name: string]: string } = {};

    if (token) {
      updatedHeaders['Authorization'] = `Bearer ${token}`;
    }

    return updatedHeaders;
  }

  private getFullUrl(url: string): string {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      const { baseUrl } = environment.api;
      return `${baseUrl}${url.startsWith('/') ? url.substring(1) : url}`;
    }
    return url;
  }

  private handleSuccessfulResponse(event: ISafeAny): HttpResponse<ISafeAny> {
    if (event instanceof HttpResponse && event.body?.data?.token) {
      sessionStorage.setItem('userToken', event.body.data.token);
    }

    if (event instanceof HttpResponse) {
      return event.clone({ body: event.body.response });
    }

    return event;
  }

  private handleErrorResponse(errorResponse: ISafeAny): Observable<HttpEvent<ISafeAny>> {
    if (errorResponse instanceof TimeoutError) {
      return throwError(() => new Error('Timeout Exception'));
    }
  
    switch (errorResponse.status) {
      case 401:
        this.handleSessionExpired();
        // Retorna un observable con un error, ya que de lo contrario no devuelve nada
        return throwError(() => new Error('Unauthorized - Session expired'));
      case 404:
      case 500:
        return throwError(() => {
          this.getCustomError(errorResponse)
        });
      default:
        return throwError(() => this.getCustomError(errorResponse));
    }
  }

  private handleSessionExpired(): void {
    sessionStorage.clear();
    this.utilitiesService.showWarningMessage('¡Session expired!');
    console.log('¡Session expired!, Redirect to Login');
  }

  private getCustomError(errorResponse: ISafeAny): HttpError {
    let customError = new HttpError();
    try {
      // Verificar si errorResponse y su estructura existen
      const errors = errorResponse?.error?.errors;
      if (Array.isArray(errors) && errors.length > 0 && errors[0]?.code) {
        customError = HttpError.initWithCode(errors[0].code);
      } else {
        console.warn('Unexpected error structure:', errorResponse);
      }
    } catch (e) {
      console.error('Error parsing custom error:', e);
    }
    return customError;
  }

  private handleRequestCompleted(): void {
    console.log('Request finished');
  }
}
