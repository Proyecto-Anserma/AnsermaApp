
import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../core/servicios/service';
import { CommonModule } from '@angular/common';
import { Ciudadano } from '../../core/modelos/ciudadano.model';
import { CIUDADANO } from '../../environments/api-costant';

@Component({
  selector: 'app-ver-ciudadanos',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './ver-ciudadanos.component.html',
  styleUrl: './ver-ciudadanos.component.css'
})
export class VerCiudadanosComponent {

  ciudadanos : Ciudadano[]=[];
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.consultar_ciudadanos();
  }




  consultar_ciudadanos(cedula?: string){
    const body = {
        cedula:"asdas"
    }

    // Consultar ciudadanos
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
}
