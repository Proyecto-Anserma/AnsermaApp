import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { EstructuraInicioComponent } from './inicio/estructura-inicio/estructura-inicio.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: EstructuraInicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ciudadanos',
    loadChildren: () => import('./ciudadanos/ciudadanos.module.routes').then(m => m.CIUDADANOS_RUTAS),
    canActivate: [AuthGuard]
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('./solicitudes/solicitudes.module.routes').then(m => m.SOLICITUDES_RUTAS),
    canActivate: [AuthGuard]
  },
  {
    path: 'ayudas',
    loadChildren: () => import('./ayudas/ayudas.module.route').then(m => m.AYUDAS_RUTAS),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
