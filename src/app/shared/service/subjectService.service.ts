import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  
  // Subjects privados para encapsular los datos y evitar modificaciones externas directas
  private datosNavegacionBase64Subject = new BehaviorSubject<string>('');
  private datosNavegacionSubject = new BehaviorSubject<string>('');

  constructor() {
    console.log('SubjectService inicializado');
  }

  /**
   * Establece un nuevo valor para el subject que maneja datos en formato Base64.
   * @param value Nuevo valor en formato Base64.
   */
  setBase64Value(value: string): void {
    this.datosNavegacionBase64Subject.next(value);
  }

  /**
   * Establece un nuevo valor para el subject que maneja datos generales.
   * @param value Nuevo valor a establecer.
   */
  setValue(value: string): void {
    this.datosNavegacionSubject.next(value);
  }

  /**
   * Devuelve el observable asociado al subject que maneja datos en formato Base64.
   * Útil para suscribirse y reaccionar a los cambios.
   * @returns Observable<string>
   */
  getBase64ValueObservable(): Observable<string> {
    return this.datosNavegacionBase64Subject.asObservable();
  }

  /**
   * Devuelve el último valor emitido por el subject que maneja datos en formato Base64.
   * @returns string
   */
  getBase64Value(): string {
    return this.datosNavegacionBase64Subject.value;
  }

  /**
   * Devuelve el último valor emitido por el subject que maneja datos generales.
   * @returns string
   */
  getValue(): string {
    return this.datosNavegacionSubject.value;
  }
}
