import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment'; // Asegúrate de tener tu token de Mapbox

@Component({
  selector: 'app-estructura-inicio',
  templateUrl: './estructura-inicio.component.html',
  styleUrls: ['./estructura-inicio.component.css']
})
export class EstructuraInicioComponent implements AfterViewInit {
  map!: mapboxgl.Map;

  ngAfterViewInit(): void {
    const coordinates: [number, number] = [-75.78194369561247, 5.242336190182367]; // Coordenadas del centro de Anserma

    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates, // Coordenadas del centro del municipio de Anserma
      zoom: 12,
      accessToken: environment.mapboxToken,
      attributionControl: false
    });

    // Agregar un marcador en el centro
    new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(this.map);

    // Asegurarse de que el mapa se centra correctamente
    this.map.on('load', () => {
      this.map.setCenter(coordinates);
    });
  }
}
