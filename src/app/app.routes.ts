import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./autenticacion/autenticacion.module.routes').then(m => m.AUTENTICACION),
    },
    {
        path: 'ciudadanos',
        loadChildren: () => import('./ciudadanos/ciudadanos.module.routes').then(m => m.CIUDADANOS_RUTAS),
    },
    {
        path: 'solicitudes',
        loadChildren: () => import('./solicitudes/solicitudes.module.routes').then(m => m.SOLICITUDES_RUTAS),
    },
    {
        path: 'ayudas',
        loadChildren: () => import('./ayudas/ayudas.module.route').then(m => m.AYUDAS_RUTAS),
    },
       
];

