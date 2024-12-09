import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

export const AUTENTICACION: Routes = [
    {
        path: 'login', component: LoginComponent, children: [
       
        ]
    }
];