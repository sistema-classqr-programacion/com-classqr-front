import { Component } from '@angular/core';

@Component({
  selector: 'app-carga-estudiante-form-dialog',
  templateUrl: './carga-estudiante-form-dialog.component.html',
  styleUrl: './carga-estudiante-form-dialog.component.scss'
})
export class CargaEstudianteFormDialogComponent {
  codigoEstudiante: string = '';

  buscarEstudiante(): void {
    if (this.codigoEstudiante) {
      console.log('Código del estudiante:', this.codigoEstudiante);
      // Agrega aquí la lógica para buscar al estudiante
    }
  }
}
