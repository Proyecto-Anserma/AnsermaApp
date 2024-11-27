import { Component } from '@angular/core';
import { Solicitud } from '../../core/modelos/solicitud.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-solicitud',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent {
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

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

  guardar() {
    console.log('Datos guardados:', this.solicitud);
    this.activeModal.close(this.solicitud);
  }

  subirFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Guardar la URL de la imagen en la solicitud
        this.solicitud.foto_solicitud = e.target.result;
      };

      reader.readAsDataURL(file); // Leer archivo como base64
    }
  }

  triggerFileInput() {
    const uploadPhotoInput = document.getElementById('uploadPhoto') as HTMLInputElement;
    uploadPhotoInput.click();
  }
}
