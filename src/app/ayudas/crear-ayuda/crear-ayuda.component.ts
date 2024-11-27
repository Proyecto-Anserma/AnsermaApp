import { Component } from '@angular/core';
import { Ayuda } from '../../core/modelos/ayuda.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-ayuda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-ayuda.component.html',
  styleUrls: ['./crear-ayuda.component.css']
})
export class CrearAyudaComponent {
  ayuda: Ayuda = {
    id_ayuda: 0,
    descripcion_solicitud: '',
    fecha_creacion_ayuda: new Date(),
    observacion_ayuda: '',
    foto_solicitud: ''
  };

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

  guardar() {
    console.log("Datos guardados:", this.ayuda);
    this.activeModal.close(this.ayuda);
  }
}