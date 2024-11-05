import { Component } from '@angular/core';
import { AsistenciaService } from '@sharedModule/service/asistencia.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.component.html',
  styleUrl: './asistentes.component.scss'
})
export class AsistentesComponent {

  constructor(
    private asistenciaService:AsistenciaService,
    private utilitiesService:UtilitiesService,
    private spinner:NgxSpinnerService
  ){

  }

  // Datos simulados de ejemplo
  data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', asistio: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', asistio: false },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', asistio: true },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', asistio: true },
    { id: 5, name: 'Robert White', email: 'robert@example.com', asistio: true },
    { id: 6, name: 'Maria Green', email: 'maria@example.com', asistio: true },
    { id: 7, name: 'David Black', email: 'david@example.com', asistio: true },
    { id: 8, name: 'Sophia Blue', email: 'sophia@example.com', asistio: false },
    { id: 9, name: 'George Red', email: 'george@example.com', asistio: true },
    { id: 10, name: 'Grace Yellow', email: 'grace@example.com', asistio: true },
    { id: 11, name: 'Oliver Pink', email: 'oliver@example.com', asistio: false },
    { id: 12, name: 'Emma Purple', email: 'emma@example.com', asistio: true },
    { id: 13, name: 'Liam Gray', email: 'liam@example.com', asistio: true },
    { id: 14, name: 'Noah Silver', email: 'noah@example.com', asistio: false },
    { id: 15, name: 'Ava Gold', email: 'ava@example.com', asistio: true },
    { id: 16, name: 'Isabella Orange', email: 'isabella@example.com', asistio: true },
    { id: 17, name: 'Mason Blue', email: 'mason@example.com', asistio: true },
    { id: 18, name: 'Logan White', email: 'logan@example.com', asistio: true },
  ];
  
  // Configuración de paginación
  page = 1;           // Página actual
  pageSize = 10;       // Tamaño de página

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  loadData():void {
    this.spinner.show();
    this.asistenciaService.asistenciaBuscarTodas().pipe(
    )

  }

}
