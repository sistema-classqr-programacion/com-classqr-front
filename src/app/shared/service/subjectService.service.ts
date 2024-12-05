import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  
  // Subject para datos en formato Base64
  private datosNavegacionBase64Subject = new BehaviorSubject<string>('');
  
  // Subject para un solo valor
  private datosNavegacionSubject = new BehaviorSubject<string>('');
  
  // Subject para una lista de valores
  private datosNavegacionListSubject = new BehaviorSubject<string[]>([]);

  private tokenSubject = new BehaviorSubject<string>('')

  constructor() {
    console.log('SubjectService inicializado');
  }

  /**
   * Actualiza el valor en el subject que maneja datos en formato Base64.
   * @param value Nuevo valor en formato Base64.
   */
  setBase64Value(value: string): void {
    this.datosNavegacionBase64Subject.next(value);
  }

  /**
   * Obtiene el observable asociado al subject de datos en formato Base64.
   * @returns Observable<string>
   */
  getBase64ValueObservable(): Observable<string> {
    return this.datosNavegacionBase64Subject.asObservable();
  }

  /**
   * Obtiene el último valor del subject de datos en formato Base64.
   * @returns string
   */
  getBase64Value(): string {
    return this.datosNavegacionBase64Subject.value;
  }

  /**
   * Actualiza el valor del subject que maneja un dato único.
   * @param value Nuevo valor a establecer.
   */
  setValue(value: string): void {
    this.datosNavegacionSubject.next(value);
  }

  /**
   * Obtiene el último valor emitido por el subject de datos únicos.
   * @returns string
   */
  getValue(): string {
    return this.datosNavegacionSubject.value;
  }

    /**
   * Actualiza el valor del subject que maneja un dato único.
   * @param value Nuevo valor a establecer.
   */
  setValueToken(value: string): void {
      this.tokenSubject.next(value);
    }
  
    /**
     * Obtiene el último valor emitido por el subject de datos únicos.
     * @returns string
     */
    getValueToken(): string {
      return this.tokenSubject.value;
    }
  

  /**
   * Agrega un nuevo valor al subject que maneja una lista de valores.
   * Si ya existen dos valores, elimina el más antiguo.
   * @param newValue Nuevo valor a agregar.
   */
  addToList(newValue: string): void {
    const currentValues = this.datosNavegacionListSubject.value;
    const updatedValues = [...currentValues, newValue].slice(-2); // Mantiene los dos más recientes
    this.datosNavegacionListSubject.next(updatedValues);
  }

  /**
   * Obtiene el observable asociado a la lista de valores.
   * @returns Observable<string[]>
   */
  getListObservable(): Observable<string[]> {
    return this.datosNavegacionListSubject.asObservable();
  }

  /**
   * Obtiene los valores actuales de la lista.
   * @returns string[]
   */
  getList(): string[] {
    return this.datosNavegacionListSubject.value;
  }

  /**
   * Limpia la lista de valores almacenados.
   */
  clearList(): void {
    this.datosNavegacionListSubject.next([]);
  }
}
