import { Component, AfterViewInit } from '@angular/core';
import { Solicitud } from '../../core/modelos/solicitud.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-crear-solicitud',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements AfterViewInit {
  solicitud: Solicitud = {
    descripcion_solicitud: '',
    geolocalizacion: '',
    id_tipo_solicitud: 0,
    id_ubicacion_solicitud: 0,
    id_ciudadano_solicitud: '',
    foto_solicitud: ''
  };

  mapa!: mapboxgl.Map; // Mapa de Mapbox
  marcador!: mapboxgl.Marker; // Marcador para selección

  constructor(public activeModal: NgbActiveModal) {}

  ngAfterViewInit(): void {
    const defaultCoordinates: [number, number] = [-75.78194369561247, 5.242336190182367];

    // Inicializar el mapa
    this.mapa = new mapboxgl.Map({
      container: 'createMap',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: defaultCoordinates,
      zoom: 14,
      accessToken: environment.mapboxToken
    });

    // Agregar marcador inicial
    this.marcador = new mapboxgl.Marker({ draggable: true })
      .setLngLat(defaultCoordinates)
      .addTo(this.mapa);

    // Manejar clic en el mapa
    this.mapa.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      this.actualizarGeolocalizacion(lng, lat);
    });

    // Manejar movimiento del marcador
    this.marcador.on('dragend', () => {
      const { lng, lat } = this.marcador.getLngLat();
      this.actualizarGeolocalizacion(lng, lat);
    });
  }

  actualizarGeolocalizacion(longitude: number, latitude: number): void {
    this.solicitud.geolocalizacion = `SRID=4326;POINT (${longitude} ${latitude})`;
    this.marcador.setLngLat([longitude, latitude]);
  }

  guardar(): void {
  
    // Cerrar el modal y enviar la solicitud directamente (no necesita formateo adicional)
    this.activeModal.close(this.solicitud);
  }

  formatearFecha(fecha: Date): string {
    // Convierte la fecha al formato 'YYYY-MM-DD'
    return fecha.toISOString().split('T')[0];
  }

  subirFoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.solicitud.foto_solicitud = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    const uploadPhotoInput = document.getElementById('uploadPhoto') as HTMLInputElement;
    uploadPhotoInput.click();
  }

  cerrarModal(): void {
    this.activeModal.dismiss('Modal cerrado');
  }
}
