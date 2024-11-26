import { Routes } from '@angular/router';
import { PantallaQrComponent } from './pantalla-qr/pantalla-qr.component';
import { AsistentesComponent } from './asistentes/asistentes.component';
import { InicioComponent } from './inicio.component';

export const PANTALLA_QR: Routes = [
  {
    path: '', // Ruta base para 'inicio'
    component: InicioComponent, // Contenedor principal
    children: [
      {
        path: 'pantalla-qr', // Ruta para Pantalla QR
        component: PantallaQrComponent,
      },
      {
        path: 'asistentes', // Ruta para Asistentes
        component: AsistentesComponent,
      },
      {
        path: '', // Redirección por defecto a 'pantalla-qr'
        redirectTo: 'pantalla-qr',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**', // Redirección global en caso de rutas inválidas
    redirectTo: '',
    pathMatch: 'full',
  },
];
