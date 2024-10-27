
import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/servicios/service';

@Component({
  selector: 'app-ver-ciudadanos',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './ver-ciudadanos.component.html',
  styleUrl: './ver-ciudadanos.component.css'
})
export class VerCiudadanosComponent {

  private apiUrl = 'http://localhost:5000/consultar-ciudadanos'; // URL del backend
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    console.log('Componente inicializado');
    const body = {
       id: 1, 
       title: "Holaaa" 
    }
    // Consultar ciudadanos
    this.apiService.post('consultar-ciudadanos',body).subscribe(
      response => {
        console.log('Respuesta del backend:', response);
      },
      error => {
        console.error('Error al consultar ciudadanos:', error);
      });
    }

}
