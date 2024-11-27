import { Component, Input } from '@angular/core';
import { Ayuda } from '../../core/modelos/ayuda.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-ayuda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-ayuda.component.html',
  styleUrl: './editar-ayuda.component.css'
})
export class EditarAyudaComponent {
  @Input() ayuda!: Ayuda;

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
