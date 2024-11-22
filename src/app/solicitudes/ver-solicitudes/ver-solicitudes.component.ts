import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/servicios/service';
import { SOLICITUD } from '../../environments/api-costant';
import { SolicitudResponse, SolicitudFiltrar } from '../../core/modelos/solicitud.model'; // Importa ambas clases
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarSolicitudComponent } from '../editar-solicitud/editar-solicitud.component';

@Component({
  selector: 'app-ver-solicitudes',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './ver-solicitudes.component.html',
  styleUrls: ['./ver-solicitudes.component.css']
})
export class VerSolicitudesComponent implements OnInit {
  [x: string]: any;
  solicitudes: SolicitudResponse[] = []; // Tipo: SolicitudResponse[]
  descripcionFiltro: string = '';
  cedulaFiltro: string = '';
  loading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.loading = true;

    // Instancia de SolicitudFiltrar para la consulta inicial
    const filtro = new SolicitudFiltrar('', ''); 

    this.apiService.post(SOLICITUD.FILTRAR_SOLICITUDES, filtro).subscribe({
      next: (respuesta: SolicitudResponse[]) => { // Tipo: SolicitudResponse[]
        this.solicitudes = respuesta;
        this.loading = false;
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

    // Instancia de SolicitudFiltrar para la consulta por filtros
    const filtro = new SolicitudFiltrar(this.descripcionFiltro, this.cedulaFiltro);

    this.loading = true;
    this.apiService.post(SOLICITUD.FILTRAR_SOLICITUDES, filtro).subscribe({
      next: (respuesta: SolicitudResponse[]) => { // Tipo: SolicitudResponse[]
        this.solicitudes = respuesta;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al consultar por descripción o cédula: ', error);
        this.loading = false;
      }
    });
  }

  abrirModalEditar(ciudadano: SolicitudFiltrar) {
    const modalRef = this['modalService'].open(EditarSolicitudComponent);
    modalRef.componentInstance.ciudadano = ciudadano;
  }
}
