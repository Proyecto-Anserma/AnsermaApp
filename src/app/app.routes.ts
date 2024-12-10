import { Routes } from '@angular/router';
import { EstructuraInicioComponent } from './inicio/estructura-inicio/estructura-inicio.component'; // Asegúrate de importarlo

export const routes: Routes = [
  {
    path: '',
    component: EstructuraInicioComponent, // Esta será la página de inicio
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
