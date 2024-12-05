import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Curso } from '@sharedModule/models/Curso';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() cursos: Curso[] = []; // Cursos pasados desde el componente padre
  @Output() cursoSeleccionado = new EventEmitter<string>(); // Emitir curso seleccionado
  public selectedOption: string = ''; // Curso seleccionado
  public urlLogo: string = ''; // URL del logo

  constructor(private spinner: NgxSpinnerService, private router: Router) {}

  ngOnInit(): void {
    this.selectedOption =
      this.cursos.length > 0 && this.cursos[0].codigoCurso
        ? this.cursos[0].codigoCurso
        : '';
  }

  /**
   * Método para realizar el logout
   */
  logout(): void {
    this.spinner.show();
    sessionStorage.clear();
    this.router.navigate(['/login']).finally(() => this.spinner.hide());
  }

  /**
   * Método para actualizar el curso seleccionado
   */
  actualizarCurso(): void {
    this.cursoSeleccionado.emit(this.selectedOption); // Emite el curso seleccionado
  }
}
