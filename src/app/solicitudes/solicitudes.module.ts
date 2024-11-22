import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { RouterModule } from '@angular/router';
import { VerSolicitudesComponent } from './ver-solicitudes/ver-solicitudes.component';
import { SOLICITUDES_RUTAS } from './solicitudes.module.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule.forChild(SOLICITUDES_RUTAS),
    VerSolicitudesComponent, 
  ],
})
export class SolicitudesModule {}
