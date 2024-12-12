import { Component, Input, OnInit } from '@angular/core';
import { Ciudadano } from '../../core/modelos/ciudadano.model';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/servicios/service';
import { Ubicacion } from '../../core/modelos/ubicacion.model';
import { UBICACION } from '../../environments/api-costant';

@Component({
  selector: 'app-editar-ciudadano',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-ciudadano.component.html',
  styleUrl: './editar-ciudadano.component.css'
})
export class EditarCiudadanoComponent implements OnInit {

  @Input() ciudadano!: Ciudadano;
  ubicaciones: Ubicacion[] = []

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService

  ) { }
  ngOnInit(){
    this.consultarTodosUbicacion();
  }

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

  guardar() {
    // Aquí puedes realizar la lógica para guardar los cambios
    // Por ejemplo, llamar a un servicio para actualizar el ciudadano
    console.log("Datos guardados:", this.ciudadano);
    this.activeModal.close(this.ciudadano);
  }

  consultarTodosUbicacion(){
    this.apiService.get(UBICACION.CONSULTAR_TODO).subscribe({
      next: (respuesta) => {
        
        this.ubicaciones = respuesta;
      },
      error: (error) => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error("Se produjo un error: " + error);
      },
    });
  }

}
