import { Routes } from "@angular/router";
import { GenerarMenuComponent } from "./generar-menu/generar-menu.component";

export const MENU_RUTAS: Routes = [
    {
        path: '', component: GenerarMenuComponent, children: [
       
        ]
    }
];