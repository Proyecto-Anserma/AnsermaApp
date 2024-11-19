import { Solicitud } from './../core/modelos/solicitud.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClient,
    NgbModalModule,
    FormsModule
  ]
})
export class SolicitudesModule { }