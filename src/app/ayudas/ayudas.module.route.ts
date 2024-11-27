import { Routes } from '@angular/router';
import { VerAyudasComponent } from './ver-ayudas/ver-ayudas.component';
import { CrearAyudaComponent } from './crear-ayuda/crear-ayuda.component';
import { EditarAyudaComponent } from './editar-ayuda/editar-ayuda.component';
import { EliminarAyudaComponent } from './eliminar-ayuda/eliminar-ayuda.component';

export const AYUDAS_RUTAS: Routes = [
    {
        path: '', component: VerAyudasComponent, children: [
            { path: 'crear', component: CrearAyudaComponent },
            { path: 'editar/:id', component: EditarAyudaComponent },
            { path: 'eliminar/:id', component: EliminarAyudaComponent }
        ]
    }
];