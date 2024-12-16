import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ayuda } from '../../core/modelos/ayuda.model';
import { CantidadOrigenAyuda } from '../../core/modelos/cantidad-origen-ayuda.model';
import { OrigenAyuda } from '../../core/modelos/origen-ayuda.model';
import { ApiService } from '../../core/servicios/service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AYUDAS, CANTIDAD_ORIGEN_AYUDA, ORIGEN_AYUDA } from '../../environments/api-costant';

@Component({
  selector: 'app-sumar-ayuda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sumar-ayuda.component.html',
  styleUrls: ['./sumar-ayuda.component.css']
})
export class SumarAyudaComponent implements OnInit {
  @Input() ayuda!: Ayuda;
  nuevaCantidad: CantidadOrigenAyuda = new CantidadOrigenAyuda(0, 0, new Date(), 0, 0);
  origenesAyuda: OrigenAyuda[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.cargarOrigenesAyuda();
  }

  cargarOrigenesAyuda(): void {
    // Aquí deberías hacer la llamada a tu API para obtener los orígenes de ayuda
    this.apiService.get(ORIGEN_AYUDA.CONSULTAR_TODO).subscribe({
      next: (origenes: OrigenAyuda[]) => {
        this.origenesAyuda = origenes;
      },
      error: (error) => {
        console.error('Error al cargar orígenes de ayuda:', error);
      }
    });
  }

  guardar(): void {
    this.nuevaCantidad.id_ayuda = this.ayuda.id_ayuda;
    
    this.apiService.post(CANTIDAD_ORIGEN_AYUDA.CREAR_CANTIDAD_ORIGEN, this.nuevaCantidad).subscribe({
      next: (respuesta) => {
        this.activeModal.close(respuesta);
      },
      error: (error) => {
        console.error('Error al guardar:', error);
      }
    });
  }

  cerrarModal(): void {
    this.activeModal.dismiss();
  }
} 