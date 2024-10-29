import { Routes } from '@angular/router';
import { VerCiudadanosComponent } from './ver-ciudadanos/ver-ciudadanos.component';


export const CIUDADANOS_RUTAS: Routes = [
    {
        path: '', component: VerCiudadanosComponent, children: [
       
        ]
    }
];