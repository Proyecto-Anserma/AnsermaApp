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
    id_solicitud: 0,
    descripcion_solicitud: '',
    fecha_creacion_solicitud: new Date(),
    geolocalizacion: '',
    tipo_solicitud: 0,
    ubicacion_solicitud: 0,
    ciudadano_solicitud: '',
    foto_solicitud: ''
  };

  mapa!: mapboxgl.Map; // Mapa Mapbox
  marcador!: mapboxgl.Marker; // Marcador para selección

  tipoSolicitudes = [
    { id: 1, nombre: 'Tipo 1' },
    { id: 2, nombre: 'Tipo 2' },
    { id: 3, nombre: 'Tipo 3' }
  ];

  ubicaciones = [
    { id: 101, nombre: 'Ubicación 1' },
    { id: 102, nombre: 'Ubicación 2' },
    { id: 103, nombre: 'Ubicación 3' }
  ];

  constructor(public activeModal: NgbActiveModal) {}

  ngAfterViewInit(): void {
    const defaultCoordinates: [number, number] = [-74.08175, 4.60971]; // Coordenadas iniciales (Bogotá, por ejemplo)

    // Inicializar el mapa
    this.mapa = new mapboxgl.Map({
      container: 'createMap', // ID del contenedor
      style: 'mapbox://styles/mapbox/streets-v12',
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
    const nuevaGeolocalizacion = `SRID=4326;POINT (${longitude} ${latitude})`;
    this.solicitud.geolocalizacion = nuevaGeolocalizacion;
    this.marcador.setLngLat([longitude, latitude]); // Actualizar marcador
  }

  guardar() {
    console.log('Datos de la nueva solicitud:', this.solicitud);
    this.activeModal.close(this.solicitud);
  }

  subirFoto(event: Event) {
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

  triggerFileInput() {
    const uploadPhotoInput = document.getElementById('uploadPhoto') as HTMLInputElement;
    uploadPhotoInput.click();
  }

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }
}
