
import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../core/servicios/service';
import { CommonModule } from '@angular/common';
import { SOLICITUD } from '../../environments/api-costant';
import { Solicitud } from '../../core/modelos/solicitud.model';

@Component({
  selector: 'app-ver-solicitudes',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './ver-solicitudes.component.html',
  styleUrl: './ver-solicitudes.component.css'
})
export class VerSolicitudesComponent {

  solicitudes : Solicitud[]=[];
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.consultar_solicitudes();
  }

  consultar_solicitudes(cedula?: string){
    const body = {
        cedula:"asdas"
    }

    // Consultar solicitudes
    this.apiService.post(SOLICITUD.CONSULTAR_SOLICITUDES,body).subscribe({
      next: (respuesta) => {
        
        this.solicitudes = respuesta;
      },
      error: (error) => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error("Se produjo un error: " + error);
      },
    });

  }
}