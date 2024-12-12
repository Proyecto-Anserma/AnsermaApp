
import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../core/servicios/service';
import { CommonModule } from '@angular/common';
import { Ciudadano } from '../../core/modelos/ciudadano.model';
import { CIUDADANO } from '../../environments/api-costant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarCiudadanoComponent } from '../editar-ciudadano/editar-ciudadano.component';
import { DetallesCiudadanoComponent } from '../detalles-ciudadano/detalles-ciudadano.component';

@Component({
  selector: 'app-ver-ciudadanos',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './ver-ciudadanos.component.html',
  styleUrl: './ver-ciudadanos.component.css'
})
export class VerCiudadanosComponent {

  ciudadanos : Ciudadano[]=[];
  
  constructor(
    private apiService: ApiService,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.consultar_ciudadanos();
  }




  consultar_ciudadanos(cedula?: string){
    const body = {
        cedula:"asdas"
    }

    this.apiService.post(CIUDADANO.CONSULTAR_CIUDADANOS,body).subscribe({
      next: (respuesta) => {
        
        this.ciudadanos = respuesta;
      },
      error: (error) => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error("Se produjo un error: " + error);
      },
    });
  }


  abrirModalEditar(ciudadano: Ciudadano) {
    const modalRef = this.modalService.open(EditarCiudadanoComponent);
    modalRef.componentInstance.ciudadano = ciudadano;
  }

  abrirModalDetalles(ciudadano: Ciudadano){
    const modalRef = this.modalService.open(DetallesCiudadanoComponent);
    modalRef.componentInstance.ciudadano = ciudadano;
  }
}
