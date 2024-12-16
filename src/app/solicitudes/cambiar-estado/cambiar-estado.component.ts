import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Solicitud } from '../../core/modelos/solicitud.model';
import { Estado } from '../../core/modelos/estado.model';
import { EstadoSolicitud } from '../../core/modelos/estado-solicitud.model';
import { ApiService } from '../../core/servicios/service';
import { ESTADO, ESTADO_SOLICITUD } from '../../environments/api-costant';

@Component({
  selector: 'app-cambiar-estado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cambiar-estado.component.html',
  styleUrls: ['./cambiar-estado.component.css']
})
export class CambiarEstadoComponent implements OnInit {
  @Input() solicitud!: Solicitud;
  estados: Estado[] = [];
  nuevoEstado: EstadoSolicitud = {
    id_solicitud: 0,
    id_estado: 0,
    observacion_solicitud: ''
  };

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.cargarEstados();
  }

  cargarEstados(): void {
    this.apiService.get(ESTADO.CONSULTAR_TODO).subscribe({
      next: (estados: Estado[]) => {
        this.estados = estados;
      },
      error: (error) => {
        console.error('Error al cargar estados:', error);
      }
    });
  }

  guardarEstado(): void {
    if (this.nuevoEstado.id_estado === 0) {
      console.error('Debe seleccionar un estado');
      return;
    }

    const estadoParaEnviar = {
      id_solicitud: this.solicitud.id_solicitud,
      id_estado: this.nuevoEstado.id_estado,
      observacion_solicitud: this.nuevoEstado.observacion_solicitud
    };

    this.apiService.post(ESTADO_SOLICITUD.CREAR_ESTADO, estadoParaEnviar).subscribe({
      next: (response) => {
        this.activeModal.close(response);
      },
      error: (error) => {
        console.error('Error al guardar el estado:', error);
      }
    });
  }

  cerrar(): void {
    this.activeModal.dismiss();
  }
} 