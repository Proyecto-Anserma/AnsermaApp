import { Routes } from '@angular/router';
import { VerSolicitudesComponent } from './ver-solicitudes/ver-solicitudes.component';


export const SOLICITUDES_RUTAS: Routes = [
    {
        path: '', component: VerSolicitudesComponent, children: [
       
        ]
    }
];