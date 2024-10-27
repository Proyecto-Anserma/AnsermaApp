import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'ciudadanos',
        loadChildren: () => import('./ciudadanos/ciudadanos.module.routes').then(m => m.CIUDADANOS_RUTAS),
    },
       
];