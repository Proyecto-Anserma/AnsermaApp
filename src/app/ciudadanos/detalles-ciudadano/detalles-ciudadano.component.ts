import { Component, Input } from '@angular/core';
import { Ciudadano } from '../../core/modelos/ciudadano.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalles-ciudadano',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './detalles-ciudadano.component.html',
  styleUrl: './detalles-ciudadano.component.css'
})
export class DetallesCiudadanoComponent {

  @Input() ciudadano!: Ciudadano;

  constructor(
    public activeModal: NgbActiveModal,

  ) { }

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

}
