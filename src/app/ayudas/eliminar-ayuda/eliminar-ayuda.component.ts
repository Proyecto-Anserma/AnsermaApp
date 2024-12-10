import { Component, Input } from '@angular/core';
import { Ayuda } from '../../core/modelos/ayuda.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-ayuda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-ayuda.component.html',
  styleUrl: './eliminar-ayuda.component.css'
})
export class EliminarAyudaComponent {
  @Input() ayuda!: Ayuda;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

  confirmarEliminacion() {
    this.activeModal.close(this.ayuda);
  }
}
