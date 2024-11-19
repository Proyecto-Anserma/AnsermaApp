import { Component, Input } from '@angular/core';
import { Solicitud } from '../../core/modelos/solicitud.model';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-solicitud',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-solicitud.component.html',
  styleUrl: './editar-solicitud.component.css'
})
export class EditarSolicitudComponent {

  @Input() solicitud!: Solicitud;

  constructor(
    public activeModal: NgbActiveModal,

  ) { }

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

  guardar() {
    // Aquí puedes realizar la lógica para guardar los cambios
    // Por ejemplo, llamar a un servicio para actualizar el ciudadano
    console.log("Datos guardados:", this.solicitud);
    this.activeModal.close(this.solicitud);
  }

}
