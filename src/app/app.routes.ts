import { Routes } from '@angular/router';
import { AsistenciaGuard } from '@core/guards/asistencia.guard';
import { RouterGuard } from '@core/guards/router.guard';

export const APP_ROUTES: Routes = [
   
    {
        path: 'qr',
        canActivate: [RouterGuard], // Protege la ruta de 'inicio'
        canActivateChild: [RouterGuard], // Si hay rutas hijas, aplica el guardián para los hijos
        loadChildren: () => import('./modules/pantalla-qr/pantalla-qr.module').then((m) => m.PantallaQrModule),
    },
    {
        path: 'asistencia',
        canActivate: [AsistenciaGuard],
        loadChildren: () => import('./modules/asistencia/asistencia.module').then((m) => m.AsistenciaModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule)
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
