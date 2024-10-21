import { Routes } from '@angular/router';
import { AsistenciaGuard } from '@core/guards/asistencia.guard';

export const APP_ROUTES: Routes = [
   
    {
        path: 'qr',
       // canActivate: [RouterGuard], // Protege la ruta de 'inicio'
       // canActivateChild: [RouterGuard], // Si hay rutas hijas, aplica el guardián para los hijos
        loadChildren: () => import('./modules/pantalla-qr/pantalla-qr.module').then((m) => m.PantallaQrModule),
    },
    {
        path: 'asistencia',
        canActivate: [AsistenciaGuard],
        loadChildren: () => import('./modules/asistencia/asistencia.module').then((m) => m.AsistenciaModule)
    },
    { path: '**', redirectTo: 'qr', pathMatch: 'full' },

];
