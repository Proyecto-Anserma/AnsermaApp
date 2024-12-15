import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../core/servicios/service';
import { SOLICITUD } from '../../environments/api-costant';
import { Solicitud, SolicitudFiltrar } from '../../core/modelos/solicitud.model'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarSolicitudComponent } from '../editar-solicitud/editar-solicitud.component';
import { DetallesSolicitudComponent } from '../detalles-solicitud/detalles-solicitud.component';
import { CrearSolicitudComponent } from '../crear-solicitud/crear-solicitud.component';
import { EliminarSolicitudComponent } from '../eliminar-solicitud/eliminar-solicitud.component';
import { EstadoSolicitud } from '../../core/modelos/estado-solicitud.model';
import { CambiarEstadoComponent } from '../cambiar-estado/cambiar-estado.component';
declare var bootstrap: any;

@Component({
  selector: 'app-ver-solicitudes',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbTooltipModule],  
  templateUrl: './ver-solicitudes.component.html',
  styleUrls: ['./ver-solicitudes.component.css']
})
export class VerSolicitudesComponent implements OnInit, AfterViewInit {
  solicitudes: Solicitud[] = []; 
  descripcionFiltro: string = '';
  cedulaFiltro: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  ngAfterViewInit() {
    // Inicializar todos los tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  cargarSolicitudes(): void {
    this.loading = true;
    const filtro = new SolicitudFiltrar('', ''); 

    this.apiService.post(SOLICITUD.FILTRAR_SOLICITUDES, filtro).subscribe({
      next: (respuesta: Solicitud[]) => {
        this.solicitudes = respuesta;
        this.loading = false;

        console.log(this.solicitudes[0].estados);
      },
      error: (error) => {
        console.error('Error al cargar solicitudes: ', error);
        this.loading = false;
      }
    });
  }

  consultarPorDato(): void {
    if (!this.descripcionFiltro && !this.cedulaFiltro) {
      console.warn('Por favor ingrese al menos una descripción o cédula para filtrar.');
      return;
    }

    const filtro = new SolicitudFiltrar(this.descripcionFiltro, this.cedulaFiltro);

    this.loading = true;
    this.apiService.post(SOLICITUD.FILTRAR_SOLICITUDES, filtro).subscribe({
      next: (respuesta: Solicitud[]) => { 
        this.solicitudes = respuesta;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al consultar por descripción o cédula: ', error);
        this.loading = false;
      }
    });
  }

  limpiarFiltros(): void {
    this.descripcionFiltro = '';
    this.cedulaFiltro = '';
    this.cargarSolicitudes();
  }

  abrirModalDetalles(solicitud: Solicitud) {
    const modalRef = this.modalService.open(DetallesSolicitudComponent, { size: 'lg' });
    modalRef.componentInstance.solicitud = { ...solicitud }; // Pasar los datos de la solicitud al modal
  }  

  abrirModalEditar(solicitud: Solicitud) {
    const modalRef = this.modalService.open(EditarSolicitudComponent);
    modalRef.componentInstance.solicitud = { ...solicitud }; 
  
    modalRef.result.then(
      (resultado: Solicitud) => {
        if (resultado) {
          // Actualizamos la solicitud en la lista local
          const index = this.solicitudes.findIndex(s => s.id_solicitud === resultado.id_solicitud);
          if (index > -1) {
            this.solicitudes[index] = resultado;
          }
        }
      },
      () => {
        console.log('Modal cerrado sin cambios');
      }
    );
  }  

  abrirModalCrear(): void {
    const modalRef = this.modalService.open(CrearSolicitudComponent);

    modalRef.result.then(
      (nuevaSolicitud: Solicitud) => {
        if (nuevaSolicitud) { 
          this.apiService.post(SOLICITUD.CREAR_SOLICITUD, nuevaSolicitud).subscribe({
            next: (respuesta: Solicitud) => {
              this.solicitudes.push(respuesta);
              console.log('Solicitud creada exitosamente');
            },
            error: (error) => {
              console.error('Error al crear la solicitud:', error);
            }
          });
        }
      },
      () => {
        console.log('Modal de creación cerrado');
      }
    );
  }

  abrirModalEliminar(solicitud: Solicitud): void {
    const modalRef = this.modalService.open(EliminarSolicitudComponent);
    modalRef.componentInstance.solicitud = solicitud;

    modalRef.result.then(
      (solicitudAEliminar: Solicitud) => {
        if (solicitudAEliminar) {
          this.apiService.delete(`${SOLICITUD.ELIMINAR_SOLICITUD}/${solicitudAEliminar.id_solicitud}`).subscribe({
            next: () => {
              this.solicitudes = this.solicitudes.filter(s => s.id_solicitud !== solicitudAEliminar.id_solicitud);
              console.log('Solicitud eliminada exitosamente');
            },
            error: (error) => {
              console.error('Error al eliminar la solicitud:', error);
            }
          });
        }
      },
      () => {
        console.log('Modal de eliminación cerrado');
      }
    );
  }

  getUltimoEstado(solicitud: Solicitud): EstadoSolicitud | undefined {
    if (!solicitud.estados || solicitud.estados.length === 0) {
      return undefined;
    }

    return solicitud.estados.reduce((ultimo, actual) => {
      const fechaUltimo = ultimo.fecha_cambio_estado_solicitud 
        ? new Date(ultimo.fecha_cambio_estado_solicitud) 
        : new Date(0);
      
      const fechaActual = actual.fecha_cambio_estado_solicitud 
        ? new Date(actual.fecha_cambio_estado_solicitud) 
        : new Date(0);

      return fechaActual > fechaUltimo ? actual : ultimo;
    });
  }

  abrirModalCambiarEstado(solicitud: Solicitud): void {
    const modalRef = this.modalService.open(CambiarEstadoComponent);
    modalRef.componentInstance.solicitud = { ...solicitud };

    modalRef.result.then(
      (nuevoEstado: EstadoSolicitud) => {
        if (nuevoEstado) {
          // Actualizar la solicitud en la lista con el nuevo estado
          const solicitudActualizada = this.solicitudes.find(s => s.id_solicitud === solicitud.id_solicitud);
          if (solicitudActualizada && solicitudActualizada.estados) {
            solicitudActualizada.estados.push(nuevoEstado);
          }
        }
      },
      () => {
        console.log('Modal de cambio de estado cerrado');
      }
    );
  }
}
