import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenerarMenuComponent } from './menu/generar-menu/generar-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GenerarMenuComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'ayudas-georeferenciadas-frontend';
}
