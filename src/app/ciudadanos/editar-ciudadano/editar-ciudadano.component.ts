import { Component, Input } from '@angular/core';
import { Ciudadano } from '../../core/modelos/ciudadano.model';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-ciudadano',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-ciudadano.component.html',
  styleUrl: './editar-ciudadano.component.css'
})
export class EditarCiudadanoComponent {

  @Input() ciudadano!: Ciudadano;

  constructor(
    public activeModal: NgbActiveModal,

  ) { }

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

  guardar() {
    // Aquí puedes realizar la lógica para guardar los cambios
    // Por ejemplo, llamar a un servicio para actualizar el ciudadano
    console.log("Datos guardados:", this.ciudadano);
    this.activeModal.close(this.ciudadano);
  }

}
