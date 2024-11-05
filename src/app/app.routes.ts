import { Routes } from '@angular/router';
import { AsistenciaGuard } from '@core/guards/asistencia.guard';
import { RouterGuard } from '@core/guards/router.guard';
import { InicioComponent } from './modules/inicio/inicio.component';

export const APP_ROUTES: Routes = [
   
    {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [RouterGuard], // Protege la ruta de 'inicio'
        canActivateChild: [RouterGuard], // Si hay rutas hijas, aplica el guardián para los hijos
        loadChildren: () => import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
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
