import { Component, Input, OnInit } from '@angular/core';
import { Curso } from '@sharedModule/models/Curso';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], // Corrección en el plural de "styleUrls"
})
export class HeaderComponent implements OnInit {
  @Input() cursos: Curso[] = []; // Cursos pasados desde el componente padre
  selectedOption: string = ''; // Curso seleccionado
  public urlLogo: string = ''; // URL del logo (puedes ajustarla dinámicamente)

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    // Puedes inicializar valores aquí si es necesario
    this.selectedOption = this.cursos.length > 0 && this.cursos[0].codigoCurso ? this.cursos[0].codigoCurso : '';
  }

  /**
   * Método para realizar el logout
   */
  logout(): void {
    this.spinner.show();
    // Lógica para el logout (redirigir, limpiar sesión, etc.)
    console.log('Logout triggered');
  }
}
