import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarMenuComponent } from './generar-menu/generar-menu.component';  // Importa el componente standalone

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GenerarMenuComponent,  // Ahora se importa directamente, no se declara
  ],
  exports: [GenerarMenuComponent],
})
export class MenuModule { }
