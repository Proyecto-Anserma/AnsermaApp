import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { SolicitudResponse } from '../../core/modelos/solicitud.model';

@Component({
  selector: 'app-detalles-solicitud',
  standalone: true,
  templateUrl: './detalles-solicitud.component.html',
  styleUrls: ['./detalles-solicitud.component.css'],
  imports: [CommonModule]  
})
export class DetallesSolicitudComponent {
  @Input() solicitud!: SolicitudResponse;

  constructor(public activeModal: NgbActiveModal) {}
}
