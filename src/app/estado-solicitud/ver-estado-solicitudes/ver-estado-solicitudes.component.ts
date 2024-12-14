import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/servicios/service';
import { EstadoSolicitud } from '../../core/modelos/estado-solicitud.model';
import { ESTADO_SOLICITUD } from '../../environments/api-costant';

@Component({
  selector: 'app-ver-estado-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-estado-solicitudes.component.html',
  styleUrls: ['./ver-estado-solicitudes.component.css']
})
export class VerEstadoSolicitudesComponent implements OnInit {
  estadosSolicitud: EstadoSolicitud[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.cargarUltimosEstados();
  }

  cargarUltimosEstados(): void {
    this.loading = true;
    const body = {
        id_solicitud: 31
    }
    this.apiService.post(ESTADO_SOLICITUD.CONSULTAR_ULTIMO_ESTADO, body).subscribe({
      next: (response) => {
        this.estadosSolicitud = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los estados de solicitud';
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }
} 