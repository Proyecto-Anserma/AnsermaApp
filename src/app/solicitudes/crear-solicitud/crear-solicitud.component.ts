import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Solicitud } from '../../core/modelos/solicitud.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { TIPO_SOLICITUD, UBICACION, CIUDADANO } from '../../environments/api-costant';
import { TipoSolicitud } from '../../core/modelos/tipo_solicitud.model';
import { Ubicacion } from '../../core/modelos/ubicacion.model';
import { ApiService } from '../../core/servicios/service';
import { Ciudadano } from '../../core/modelos/ciudadano.model';

@Component({
  selector: 'app-crear-solicitud',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit, AfterViewInit {
  solicitud: Solicitud = {
    descripcion_solicitud: '',
    geolocalizacion: '',
    id_tipo_solicitud:null, // Cambiar a null
    id_ubicacion_solicitud: null, // Cambiar a null
    id_ciudadano_solicitud: '',
    foto_solicitud: ''
  };
  

  mapa!: mapboxgl.Map; // Mapa de Mapbox
  marcador!: mapboxgl.Marker; // Marcador para selección

  tipoSolicitudes: TipoSolicitud[] = []
  ubicaciones: Ubicacion[] = []
  ciudadanos: Ciudadano[] = [];

  constructor(
    public activeModal: NgbActiveModal, 
    private apiService: ApiService
  ) {}

  ngOnInit(){
    console.log(this.solicitud)
    this.consultarTodosTipoSolicitud();
    this.consultarTodosUbicacion();
    this.consultarCiudadanos();

    
  }

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

    this.solicitud.geolocalizacion ="SRID=4326;POINT (-75.58503817385566 6.23594400231994)";
    console.log(this.solicitud)
  
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


  consultarTodosTipoSolicitud(){
    this.apiService.get(TIPO_SOLICITUD.CONSULTAR_TODO).subscribe({
      next: (respuesta) => {
        
        this.tipoSolicitudes = respuesta;
      },
      error: (error) => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error("Se produjo un error: " + error);
      },
    });
  }


  consultarTodosUbicacion(){
    this.apiService.get(UBICACION.CONSULTAR_TODO).subscribe({
      next: (respuesta) => {
        
        this.ubicaciones = respuesta;
        console.log(this.solicitud.id_ubicacion_solicitud)
      },
      error: (error) => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error("Se produjo un error: " + error);
      },
    });
  }

  consultarCiudadanos() {
    this.apiService.post(CIUDADANO.CONSULTAR_CIUDADANOS, {}).subscribe({
      next: (respuesta) => {
        this.ciudadanos = respuesta;
      },
      error: (error) => {
        console.error("Error al cargar ciudadanos: ", error);
      }
    });
  }
}
