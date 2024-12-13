import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/servicios/auth.service';

@Component({
  selector: 'app-generar-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generar-menu.component.html',
  styleUrl: './generar-menu.component.css'
})
export class GenerarMenuComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
