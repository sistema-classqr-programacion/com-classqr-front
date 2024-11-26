import { Component } from '@angular/core';

@Component({
  selector: 'app-carga-estudiante-dialog',
  templateUrl: './carga-estudiante-dialog.component.html',
  styleUrl: './carga-estudiante-dialog.component.scss'
})
export class CargaEstudianteDialogComponent {
  fileSelected: File | null = null; // Archivo seleccionado
  fileName: string = ''; // Nombre del archivo
  errorMessage: string = ''; // Mensaje de error

  /**
   * Maneja la selección de archivos y valida el tipo.
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validExtensions = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

      if (!validExtensions.includes(file.type)) {
        this.fileSelected = null;
        this.fileName = '';
        this.errorMessage = 'El archivo debe ser de tipo Excel (.xls, .xlsx)';
      } else {
        this.fileSelected = file;
        this.fileName = file.name;
        this.errorMessage = ''; // Limpiar mensaje de error
      }
    }
  }

  /**
   * Lógica para cargar el archivo seleccionado.
   */
  onUpload(): void {
    if (this.fileSelected) {
      console.log('Cargando archivo:', this.fileSelected.name);
      // Aquí puedes agregar la lógica para enviar el archivo al servidor
    }
  }
}
