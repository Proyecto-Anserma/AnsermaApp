import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/servicios/service';
import { SOLICITUD, TIPO_SOLICITUD, UBICACION } from '../../environments/api-costant';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import 'mapbox-gl/dist/mapbox-gl.css';
import { TipoSolicitud } from '../../core/modelos/tipo_solicitud.model';
import { Ubicacion } from '../../core/modelos/ubicacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-solicitud',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements OnInit, AfterViewInit {
  @Input() solicitud!: Record<string, any>;
  mapa!: mapboxgl.Map; // Mapa Mapbox
  marcador!: mapboxgl.Marker; // Marcador en el mapa}

  tipoSolicitudes: TipoSolicitud[] = []
  ubicaciones: Ubicacion[] = []


  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService
  ) {}


  ngOnInit(){
    this.consultarTodosTipoSolicitud();
    this.consultarTodosUbicacion();
  }

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
    const solicitudId = this.solicitud['id_solicitud'];
    const solicitudPeticion = { ...this.solicitud };
    const url = `${SOLICITUD.EDITAR_SOLICITUD}/${solicitudId}`;

    delete solicitudPeticion['tipo_solicitud'];
    
    this.apiService.put(url, solicitudPeticion).subscribe({
      next: (response) => {

        this.solicitud['tipo_solicitud'] = this.tipoSolicitudes[this.solicitud['id_tipo_solicitud']-1]

        Swal.fire({
          title: 'Éxito',
          text: 'Solicitud editada con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary', // Clase de estilo de Bootstrap
          },
          buttonsStyling: false // Desactiva los estilos predeterminados de SweetAlert2
        });
    

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
      },
      error: (error) => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error("Se produjo un error: " + error);
      },
    });
  }
}
