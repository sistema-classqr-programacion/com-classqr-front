import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdjuntarEstudianteCurso } from '@sharedModule/models/AdjuntarEstudianteCurso';
import { CursoEstudianteService } from '@sharedModule/service/curso-estudiante.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-carga-estudiante-form-dialog',
  templateUrl: './carga-estudiante-form-dialog.component.html',
  styleUrls: ['./carga-estudiante-form-dialog.component.scss']
})
export class CargaEstudianteFormDialogComponent {
  codigoEstudiante: string = ''; // Código del estudiante
  isLoading: boolean = false;

  constructor(
    private cursoEstudianteService: CursoEstudianteService,
    private spinner: NgxSpinnerService,
    private utilities: UtilitiesService,
    private subject: SubjectService,
    private dialogRef: MatDialogRef<CargaEstudianteFormDialogComponent>
  ) {}

  registrarEstudiante(): void {
    if (this.codigoEstudiante) {
      this.isLoading = true;
      const codigoCurso = this.subject.getValue();
      const data: AdjuntarEstudianteCurso = {
        codigoCurso: codigoCurso,
        codigoEstudiante: this.codigoEstudiante
      };

      this.spinner.show();
      this.cursoEstudianteService.cargarEstudianteCurso(data).subscribe({
        next: () => {
          this.utilities.showSucessMessage('Estudiante agregado correctamente');
          this.dialogRef.close(true); // Retorna true al cerrar
        },
        error: (err) => {
          this.utilities.showErrorMessage('Ocurrió un error al agregar el estudiante.');
          console.error('Error:', err);
          this.spinner.hide()
          this.dialogRef.close(false); // Retorna false al cerrar
        },
        complete: () => {
          this.spinner.hide();
          this.isLoading = false;
        }
      });
    }
  }
}
