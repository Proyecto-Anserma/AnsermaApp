import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/servicios/auth.service';

@Component({
  selector: 'app-generar-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './generar-menu.component.html',
  styleUrl: './generar-menu.component.css'
})
export class GenerarMenuComponent {
  menuItems = [
    { nombre: 'Inicio', icono: 'fas fa-home', ruta: '/' },
    { nombre: 'Ciudadanos', icono: 'fas fa-users', ruta: '/ciudadanos' },
    { nombre: 'Solicitudes', icono: 'fas fa-file-alt', ruta: '/solicitudes' },
    { nombre: 'Ayudas', icono: 'fas fa-hands-helping', ruta: '/ayudas' },
    { nombre: 'Estado Solicitud', icono: 'fas fa-tasks', ruta: '/estado-solicitud' },
    { nombre: 'Reportes', icono: 'fas fa-chart-bar', ruta: '/reportes' }
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
