import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerarMenuComponent } from './generar-menu/generar-menu.component';



@NgModule({
  declarations: [GenerarMenuComponent],
  imports: [
    CommonModule
  ],
  exports:[GenerarMenuComponent]

})
export class MenuModule { }
