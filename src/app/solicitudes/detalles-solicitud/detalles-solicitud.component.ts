import { Component, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Solicitud } from '../../core/modelos/solicitud.model';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import 'mapbox-gl/dist/mapbox-gl.css';


@Component({
  selector: 'app-detalles-solicitud',
  standalone: true,
  templateUrl: './detalles-solicitud.component.html',
  styleUrls: ['./detalles-solicitud.component.css'],
  imports: [CommonModule]
})
export class DetallesSolicitudComponent implements AfterViewInit {
  @Input() solicitud!: Solicitud;

  map!: mapboxgl.Map;

  constructor(public activeModal: NgbActiveModal) {}

  ngAfterViewInit(): void {
    // Parsear la geolocalización desde el string
    const coordinates = this.parseCoordinates(this.solicitud.geolocalizacion);

    // Inicializar el mapa con el token en la configuración
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates, // Coordenadas del punto
      zoom: 14, // Nivel de zoom
      accessToken: environment.mapboxToken,
      attributionControl: false
    });

    // Agregar un marcador en el punto con un ligero desplazamiento
    new mapboxgl.Marker({ offset: [0, 0] }) // Desplaza el marcador ligeramente hacia arriba
      .setLngLat(coordinates)
      .addTo(this.map);

    // Asegurar que el mapa se centra correctamente con un ajuste adicional
    this.map.on('load', () => {
      const offset: [number, number] = [0,0]; // Asegurar que el tipo sea [number, number]
      this.map.setCenter(coordinates); // Centra el mapa en las coordenadas
      this.map.panBy(offset); // Ajusta el centro del mapa en píxeles
      this.map.resize(); // Ajusta dimensiones si es necesario
    });
  }

  // Función para extraer las coordenadas del string
  private parseCoordinates(geoString: string): [number, number] {
    const match = geoString.match(/POINT\s\(([^)]+)\)/);
    if (!match) {
      console.error('Formato de geolocalización inválido');
      return [0, 0]; // Valores predeterminados en caso de error
    }

    const [lng, lat] = match[1].split(' ').map(coord => parseFloat(coord));
    return [lng, lat];
  }
}
