import { Component, Input, OnInit, AfterViewInit } from '@angular/core'; 
import { Ciudadano } from '../../core/modelos/ciudadano.model'; 
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { FormsModule } from '@angular/forms'; 
import { ApiService } from '../../core/servicios/service'; 
import { Ubicacion } from '../../core/modelos/ubicacion.model'; 
import { CIUDADANO, PERTENENCIA_ETNICA, UBICACION } from '../../environments/api-costant'; 
import { CommonModule } from '@angular/common'; 
import { PertenenciaEtnica } from '../../core/modelos/pertenencia_etnica.model';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import 'mapbox-gl/dist/mapbox-gl.css';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-ciudadano',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-ciudadano.component.html',
  styleUrl: './editar-ciudadano.component.css'
}) 
export class EditarCiudadanoComponent implements OnInit, AfterViewInit {
  @Input() ciudadano!: Record<string, any>;
  mapa!: mapboxgl.Map; // Mapa Mapbox
  marcador!: mapboxgl.Marker; // Marcador en el mapa

  ubicaciones: Ubicacion[] = []
  pertenenciasEtnicas: PertenenciaEtnica[] = []

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.consultarTodosUbicacion();
    this.consultarTodasPertenenciaEtnica();
  }

  ngAfterViewInit(): void {
    // Verificar si existe geolocalización
    if (this.ciudadano['geolocalizacion']) {
      const coordinates = this.parseCoordinates(this.ciudadano['geolocalizacion']);

      // Inicializar el mapa
      this.mapa = new mapboxgl.Map({
        container: 'editMap',
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: coordinates,
        zoom: 14,
        accessToken: environment.mapboxToken,
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
    } else {
      // Si no hay geolocalización, inicializar con coordenadas por defecto
      const defaultCoordinates: [number, number] = [-74.0721, 4.7110]; // Coordenadas de Bogotá como ejemplo
      
      this.mapa = new mapboxgl.Map({
        container: 'editMap',
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: defaultCoordinates,
        zoom: 14,
        accessToken: environment.mapboxToken,
      });

      this.marcador = new mapboxgl.Marker({ draggable: true })
        .setLngLat(defaultCoordinates)
        .addTo(this.mapa);

      // Establecer geolocalización inicial
      this.actualizarGeolocalizacion(defaultCoordinates[0], defaultCoordinates[1]);
    }
  }

  // Método para parsear coordenadas
  private parseCoordinates(geoString: string): [number, number] {
    const match = geoString.match(/POINT\s\(([^)]+)\)/);
    if (!match) {
      console.error('Formato de geolocalización inválido');
      return [0, 0]; // Valores predeterminados en caso de error
    }
    const [lng, lat] = match[1].split(' ').map(coord => parseFloat(coord));
    return [lng, lat];
  }

  // Actualizar geolocalización en el mapa y en el objeto ciudadano
  actualizarGeolocalizacion(longitude: number, latitude: number): void {
    const nuevaGeolocalizacion = `SRID=4326;POINT (${longitude} ${latitude})`;
    this.ciudadano['geolocalizacion'] = nuevaGeolocalizacion;
    this.marcador.setLngLat([longitude, latitude]); // Mover el marcador
  }

  // Método para guardar los cambios
  guardar() {
    const ciudadanoId = this.ciudadano['numero_identificacion_ciudadano'];
    const ciudadanoPeticion = { ...this.ciudadano };
    const url = `${CIUDADANO.EDITAR_CIUDADANO}/${ciudadanoId}`;

    // Eliminar propiedades que no deben enviarse en la petición
    delete ciudadanoPeticion['ubicacion_ciudadano'];
    delete ciudadanoPeticion['pertenencia_etnica_ciudadano'];
    delete ciudadanoPeticion['genero']; 

    console.log('Objeto a enviar:', ciudadanoPeticion);
    
    this.apiService.put(url, ciudadanoPeticion).subscribe({
      next: (response) => {
        // Establecer relaciones de tipo y ubicación después de la edición
        this.ciudadano['ubicacion_ciudadano'] = this.ubicaciones.find(
          ubicacion => ubicacion.id_ubicacion === this.ciudadano['id_ubicacion_ciudadano']
        );
        
        this.ciudadano['pertenencia_etnica_ciudadano'] = this.pertenenciasEtnicas.find(
          pertenencia => pertenencia.id_pertenencia_etnica === this.ciudadano['id_pertenencia_etnica_ciudadano']
        );

        Swal.fire({
          title: 'Éxito',
          text: 'Ciudadano editado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false
        });

        this.activeModal.close(this.ciudadano);
      },
      error: (error) => {
        console.error('Error al editar el ciudadano:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo editar el ciudadano',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  // Métodos existentes
  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

  consultarTodosUbicacion() {
    this.apiService.get(UBICACION.CONSULTAR_TODO).subscribe({
      next: (respuesta) => {
        this.ubicaciones = respuesta;
      },
      error: (error) => {
        console.error("Se produjo un error: " + error);
      },
    });
  }

  consultarTodasPertenenciaEtnica() {
    this.apiService.get(PERTENENCIA_ETNICA.CONSULTAR_TODO).subscribe({
      next: (respuesta) => {
        this.pertenenciasEtnicas = respuesta;
      },
      error: (error) => {
        console.error("Se produjo un error: " + error);
      },
    });
  }
}