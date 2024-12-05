import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CursoEstudianteService } from '@sharedModule/service/curso-estudiante.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-carga-estudiante-dialog',
  templateUrl: './carga-estudiante-dialog.component.html',
  styleUrls: ['./carga-estudiante-dialog.component.scss']
})
export class CargaEstudianteDialogComponent {
  fileSelected: File | null = null; // Archivo seleccionado
  fileName: string = ''; // Nombre del archivo
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private cursoEstudianteService: CursoEstudianteService,
    private spinner: NgxSpinnerService,
    private utilidades: UtilitiesService,
    private subject: SubjectService,
    private dialogRef: MatDialogRef<CargaEstudianteDialogComponent>
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validExtensions = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];

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

  onUpload(): void {
    if (this.fileSelected) {
      this.spinner.show();
      const codigoCurso = this.subject.getValue();
      this.cursoEstudianteService.cargarEstudianteCursoExcel(this.fileSelected, codigoCurso).subscribe({
        next: () => {
          this.utilidades.showSucessMessage('Archivo cargado correctamente');
          this.dialogRef.close(true); // Retorna true al cerrar
        },
        error: (error) => {
          this.utilidades.showErrorMessage('Ocurrió un error al cargar el archivo');
          console.error('Error al cargar el archivo:', error);
          this.dialogRef.close(false); // Retorna false al cerrar
        },
        complete: () => this.spinner.hide()
      });
    } else {
      this.utilidades.showWarningMessage('Debe seleccionar un archivo antes de cargarlo');
    }
  }
}
