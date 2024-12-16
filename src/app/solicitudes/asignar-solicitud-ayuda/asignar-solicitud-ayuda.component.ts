import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Solicitud } from '../../core/modelos/solicitud.model';
import { SolicitudAyuda } from '../../core/modelos/solicitud-ayuda.model';
import { Ayuda } from '../../core/modelos/ayuda.model';
import { ApiService } from '../../core/servicios/service';
import { AYUDAS } from '../../environments/api-costant';

@Component({
  selector: 'app-asignar-solicitud-ayuda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignar-solicitud-ayuda.component.html',
  styleUrls: ['./asignar-solicitud-ayuda.component.scss']
})
export class AsignarSolicitudAyudaComponent implements OnInit {
  @Input() solicitud!: Solicitud;
  ayudas: Ayuda[] = [];
  solicitudAyuda: SolicitudAyuda = {
    id_solicitud_ayuda: 0,
    cantidad_solicitud_ayuda: 0,
    fecha_entrega_solicitud_ayuda: new Date(),
    foto_entrega_solicitud_ayuda: '',
    id_solicitud: 0,
    id_ayuda: 0
  };

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.solicitudAyuda.id_solicitud = this.solicitud.id_solicitud || 0;
    this.solicitudAyuda.cantidad_solicitud_ayuda = this.solicitud.cantidad_solicitud || 0;
    this.cargarAyudas();
  }

  cargarAyudas(): void {
    this.apiService.get(AYUDAS.VER_TODAS_AYUDAS).subscribe({
      next: (respuesta: Ayuda[]) => {
        this.ayudas = respuesta;
        console.log('Ayudas cargadas:', this.ayudas);
      },
      error: (error) => {
        console.error('Error al cargar las ayudas:', error);
      }
    });
  }

  onFotoSeleccionada(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.solicitudAyuda.foto_entrega_solicitud_ayuda = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarAsignacion(): void {
    // Aquí deberías hacer la llamada a tu API para guardar la asignación
    // this.apiService.post('URL_DE_TU_API/solicitud-ayuda', this.solicitudAyuda).subscribe(...)
    this.activeModal.close(this.solicitudAyuda);
  }

  cerrarModal(): void {
    this.activeModal.dismiss();
  }
} 