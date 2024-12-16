import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ESTADO_SOLICITUD } from '../../environments/api-costant';
import { ReporteSolicitud } from '../interfaces/reporte-solicitud.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  constructor(private http: HttpClient) {}

  obtenerReporteSolicitudes(filtros?: any): Observable<ReporteSolicitud[]> {
    if (!filtros) {
      return this.http.post<ReporteSolicitud[]>(ESTADO_SOLICITUD.REPORTES_SOLICITUDES, {})
        .pipe(catchError(this.handleError));
    }
    
    const params: any = {};
    
    if (filtros.fechaInicio) {
      params.fecha_inicio = filtros.fechaInicio;
    }
    
    if (filtros.fechaFin) {
      params.fecha_fin = filtros.fechaFin;
    }
    
    if (filtros.estado !== null && filtros.estado !== '') {
      params.estado = Number(filtros.estado);
    }

    return this.http.post<ReporteSolicitud[]>(ESTADO_SOLICITUD.REPORTES_SOLICITUDES, params)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error en la consulta';
    
    if (error.error?.detail) {
      if (error.error.detail.includes('No se encontraron registros para el reporte')) {
        return throwError(() => 'No se encontraron registros con los filtros especificados');
      }
      return throwError(() => error.error.detail.split(':').pop()?.trim() || errorMessage);
    }

    return throwError(() => errorMessage);
  }
} 