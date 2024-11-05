import { Routes } from '@angular/router';
import { PantallaQrComponent } from './pantalla-qr/pantalla-qr.component';
import { AsistentesComponent } from './asistentes/asistentes.component';

export const PANTALLA_QR: Routes = [
    {
        path: '',
        component: PantallaQrComponent
    },
    {
        path: 'asistentes',
        component: AsistentesComponent
    }
]