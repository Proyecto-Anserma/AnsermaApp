import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/servicios/service';
import { AYUDAS } from '../../environments/api-costant';
import { Ayuda } from '../../core/modelos/ayuda.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarAyudaComponent } from '../editar-ayuda/editar-ayuda.component';
import { CrearAyudaComponent } from '../crear-ayuda/crear-ayuda.component';
import { EliminarAyudaComponent } from '../eliminar-ayuda/eliminar-ayuda.component';

@Component({
  selector: 'app-ver-ayudas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ver-ayudas.component.html',
  styleUrls: ['./ver-ayudas.component.css']
})
export class VerAyudasComponent implements OnInit {
  ayudas: Ayuda[] = [];
  fechaFiltro: string = '';
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.cargarAyudas();
  }

  cargarAyudas(): void {
    this.loading = true;
    const body = {
      fecha_creacion_ayuda: null
    };

    this.apiService.post(AYUDAS.FILTRAR_AYUDAS, body).subscribe({
      next: (respuesta: Ayuda[]) => {
        this.ayudas = respuesta;
        this.loading = false;
        console.log(this.ayudas);
      },
      error: (error) => {
        console.error('Error al cargar ayudas:', error);
        this.loading = false;
      }
    });
  }

  consultarPorFecha(): void {
    if (!this.fechaFiltro) {
      console.warn('Por favor ingrese una fecha para filtrar.');
      return;
    }

    this.loading = true;
    const body = {
      fecha_creacion_ayuda: this.fechaFiltro
    };

    this.apiService.post(AYUDAS.FILTRAR_AYUDAS, body).subscribe({
      next: (respuesta: Ayuda[]) => {
        this.ayudas = respuesta;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al consultar por fecha:', error);
        this.loading = false;
      }
    });
  }

  limpiarFiltros(): void {
    this.fechaFiltro = '';
    this.cargarAyudas();
  }

  abrirModalCrear(): void {
    const modalRef = this.modalService.open(CrearAyudaComponent);

    modalRef.result.then(
      (nuevaAyuda: Ayuda) => {
        if (nuevaAyuda) {
          const body = {
            descripcion_solicitud: nuevaAyuda.descripcion_solicitud,
            fecha_creacion_ayuda: nuevaAyuda.fecha_creacion_ayuda,
            observacion_ayuda: nuevaAyuda.observacion_ayuda,
            foto_solicitud: nuevaAyuda.foto_solicitud
          };

          this.apiService.post(AYUDAS.CREAR_AYUDA, body).subscribe({
            next: (respuesta: Ayuda) => {
              this.ayudas.push(respuesta);
              console.log('Ayuda creada exitosamente');
            },
            error: (error) => {
              console.error('Error al crear la ayuda:', error);
            }
          });
        }
      },
      () => {
        console.log('Modal de creación cerrado');
      }
    );
  }

  abrirModalEditar(ayuda: Ayuda): void {
    const modalRef = this.modalService.open(EditarAyudaComponent);
    modalRef.componentInstance.ayuda = { ...ayuda };

    modalRef.result.then(
      (ayudaEditada: Ayuda) => {
        if (ayudaEditada) {
          this.apiService.put(`${AYUDAS.EDITAR_AYUDA}/${ayudaEditada.id_ayuda}`, ayudaEditada).subscribe({
            next: (respuesta: Ayuda) => {
              const index = this.ayudas.findIndex(a => a.id_ayuda === respuesta.id_ayuda);
              if (index !== -1) {
                this.ayudas[index] = respuesta;
              }
              console.log('Ayuda actualizada exitosamente');
            },
            error: (error) => {
              console.error('Error al actualizar la ayuda:', error);
            }
          });
        }
      },
      () => {
        console.log('Modal de edición cerrado');
      }
    );
  }

  abrirModalEliminar(ayuda: Ayuda): void {
    const modalRef = this.modalService.open(EliminarAyudaComponent);
    modalRef.componentInstance.ayuda = ayuda;

    modalRef.result.then(
      (ayudaAEliminar: Ayuda) => {
        if (ayudaAEliminar) {
          this.apiService.delete(`${AYUDAS.ELIMINAR_AYUDA}/${ayudaAEliminar.id_ayuda}`).subscribe({
            next: () => {
              this.ayudas = this.ayudas.filter(a => a.id_ayuda !== ayudaAEliminar.id_ayuda);
              console.log('Ayuda eliminada exitosamente');
            },
            error: (error) => {
              console.error('Error al eliminar la ayuda:', error);
            }
          });
        }
      },
      () => {
        console.log('Modal de eliminación cerrado');
      }
    );
  }

  calcularTotalAyudasRecibidas(ayuda: Ayuda): number {
    if (!ayuda.cantidades_origen_ayuda) return 0;
    return ayuda.cantidades_origen_ayuda.reduce((total, item) => 
      total + item.cantidad_origen_ayuda, 0);
  }

  calcularTotalAyudasDadas(ayuda: Ayuda): number {
    if (!ayuda.solicitudes_ayuda) return 0;
    return ayuda.solicitudes_ayuda.reduce((total, solicitud) => 
      total + (solicitud.cantidad_solicitud_ayuda || 0), 0);
  }

  calcularAyudasDisponibles(ayuda: Ayuda): number {
    const totalRecibidas = this.calcularTotalAyudasRecibidas(ayuda);
    const totalDadas = this.calcularTotalAyudasDadas(ayuda);
    return totalRecibidas - totalDadas;
  }
}

