import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenerarMenuComponent } from './menu/generar-menu/generar-menu.component';
import { FormsModule } from '@angular/forms';  // Importar FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GenerarMenuComponent, FormsModule],  // Asegúrate de agregar FormsModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ayudas-georeferenciadas-frontend';
}
