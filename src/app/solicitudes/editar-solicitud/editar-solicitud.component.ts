import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/servicios/service'; 
import { SOLICITUD } from '../../environments/api-costant';

@Component({
  selector: 'app-editar-solicitud',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent {
  @Input() solicitud!: Record<string, any>;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService
  ) {}

  guardar() {
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
        // Guardar la URL de la imagen en la solicitud
        this.solicitud['foto_solicitud'] = e.target.result;
      };
  
      reader.readAsDataURL(file); // Leer archivo como base64
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
