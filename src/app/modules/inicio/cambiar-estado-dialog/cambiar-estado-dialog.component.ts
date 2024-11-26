import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estudiante } from '@sharedModule/models/Estudiante';

@Component({
  selector: 'app-cambiar-estado-dialog',
  templateUrl: './cambiar-estado-dialog.component.html',
  styleUrl: './cambiar-estado-dialog.component.scss'
})
export class CambiarEstadoDialogComponent {
  changeStatusForm: FormGroup;
  statuses = [
    { value: 'asisitio', label: 'Asistio' },
    { value: 'noAsisitio', label: 'No Asistio' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CambiarEstadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estudiante // Recibe datos del estudiante
  ) {
    // Inicializa el formulario con el estado actual del estudiante
    this.changeStatusForm = this.fb.group({
      status: [data.asistio || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.changeStatusForm.valid) {
      // Cierra el diálogo y envía el nuevo estado
      this.dialogRef.close({ status: this.changeStatusForm.value.status });
    }
  }
}
