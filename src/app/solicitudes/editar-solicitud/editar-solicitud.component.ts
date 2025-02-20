import { Component, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/servicios/service';
import { SOLICITUD } from '../../environments/api-costant';
import { SolicitudResponse } from '../../core/modelos/solicitud.model';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-editar-solicitud',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements AfterViewInit {
  @Input() solicitud!: Record<string, any>;
  mapa!: mapboxgl.Map; // Mapa Mapbox
  marcador!: mapboxgl.Marker; // Marcador en el mapa

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService
  ) {}

  ngAfterViewInit(): void {
    const coordinates = this.parseCoordinates(this.solicitud['geolocalizacion']); // Corregir acceso a la propiedad

    // Inicializar el mapa y otras configuraciones
    this.initializeMap(coordinates);

    this.mapa = new mapboxgl.Map({
      container: 'editMap',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates, // Usar las coordenadas obtenidas
      zoom: 14,
      accessToken: environment.mapboxToken, // Pasar el token aquí
    });

    // Agregar marcador inicial
    this.marcador = new mapboxgl.Marker({ draggable: true })
      .setLngLat(coordinates)
      .addTo(this.mapa);

    // Manejar clic en el mapa para actualizar la posición
    this.mapa.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      this.actualizarGeolocalizacion(lng, lat);
    });
  }

  private parseCoordinates(geoString: string): [number, number] {
    const match = geoString.match(/POINT\s\(([^)]+)\)/);
    if (!match) {
      console.error('Formato de geolocalización inválido');
      return [0, 0]; // Valores predeterminados en caso de error
    }
    const [lng, lat] = match[1].split(' ').map(coord => parseFloat(coord));
    return [lng, lat];
  }
  
  private initializeMap(coordinates: [number, number]) {
    this.mapa = new mapboxgl.Map({
      container: 'editMap', // ID del contenedor para el mapa
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates,
      zoom: 14,
      accessToken: environment.mapboxToken
    });

    // Agregar el marcador en las coordenadas iniciales
    new mapboxgl.Marker().setLngLat(coordinates).addTo(this.mapa);
  }

  // Extraer coordenadas del formato "SRID=4326;POINT (lng lat)"
  extraerCoordenadas(geoString: string): [number, number] {
    const match = geoString.match(/POINT\s?\(([-\d.]+)\s+([-\d.]+)\)/);
    return match ? [parseFloat(match[1]), parseFloat(match[2])] : [0, 0];
  }

  // Actualizar geolocalización en el mapa y en el objeto solicitud
  actualizarGeolocalizacion(longitude: number, latitude: number): void {
    const nuevaGeolocalizacion = `SRID=4326;POINT (${longitude} ${latitude})`;
    this.solicitud['geolocalizacion'] = nuevaGeolocalizacion; // Corregir acceso a la propiedad
    this.marcador.setLngLat([longitude, latitude]); // Mover el marcador
  }

  guardar() {
    console.log('Geolocalización actual:', this.solicitud['geolocalizacion']); // Corregir acceso a la propiedad
    const solicitudId = this.solicitud['id_solicitud'];
    const url = `${SOLICITUD.EDITAR_SOLICITUD}/${solicitudId}`;
    this.apiService.put(url, this.solicitud).subscribe({
      next: (response) => {
        console.log('Solicitud editada exitosamente:', response);
        this.activeModal.close(this.solicitud);
      },
      error: (error) => {
        console.error('Error al editar la solicitud:', error);
      }
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  obtenerTitulo(fieldName: string): string {
    const map: { [key: string]: string } = {
      'descripcion_solicitud': 'Descripción solicitud',
      'fecha_creacion_solicitud': 'Fecha de creación',
      'foto_solicitud': 'Foto de solicitud',
      'geolocalizacion': 'Geolocalización',
      'id_tipo_solicitud': 'Tipo de solicitud',
      'id_ubicacion_solicitud': 'Ubicación de solicitud',
      'id_ciudadano_solicitud': 'Ciudadano solicitud'
    };
    return map[fieldName] || fieldName;
  }

  subirFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.solicitud['foto_solicitud'] = e.target.result;
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
