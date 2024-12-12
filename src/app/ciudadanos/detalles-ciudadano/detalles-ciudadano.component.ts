import { Component, Input, AfterViewInit } from '@angular/core';
import { Ciudadano } from '../../core/modelos/ciudadano.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-detalles-ciudadano',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './detalles-ciudadano.component.html',
  styleUrl: './detalles-ciudadano.component.css'
})
export class DetallesCiudadanoComponent implements AfterViewInit {
  @Input() ciudadano!: Ciudadano;
  map!: mapboxgl.Map;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngAfterViewInit(): void {
    // Parsear la geolocalización desde el string
    const coordinates = this.parseCoordinates(this.ciudadano.geolocalizacion);

    // Inicializar el mapa con el token en la configuración
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates, // Coordenadas del punto
      zoom: 12, // Nivel de zoom
      accessToken: environment.mapboxToken,
      attributionControl: false
    });

    // Agregar un marcador en el punto con un ligero desplazamiento
    new mapboxgl.Marker({ offset: [0, 0] }) 
      .setLngLat(coordinates)
      .addTo(this.map);

    // Asegurar que el mapa se centra correctamente con un ajuste adicional
    this.map.on('load', () => {
      const offset: [number, number] = [0,0];
      this.map.setCenter(coordinates);
      this.map.panBy(offset);
      this.map.resize();
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

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }
}