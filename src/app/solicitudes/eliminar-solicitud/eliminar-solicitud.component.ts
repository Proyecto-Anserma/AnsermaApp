import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-solicitud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-solicitud.component.html',
  styleUrls: ['./eliminar-solicitud.component.css']
})
export class EliminarSolicitudComponent {
  @Input() solicitud!: { descripcion_solicitud: string; fecha_creacion_solicitud: Date };

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

  confirmarEliminacion() {
    this.activeModal.close(this.solicitud);
  }
}
