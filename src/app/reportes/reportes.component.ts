import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { ReporteSolicitud } from '../core/interfaces/reporte-solicitud.interface';
import { ReportesService } from '../core/servicios/reportes.service';
import { ESTADO_SOLICITUD } from '../environments/api-costant';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  private chart: Chart | undefined;
  hayDatos: boolean = true;
  mensajeNoData: string = '';
  tipoReporteActual: 'solicitudes' | 'ciudadanos' | 'ayudas' = 'solicitudes';
  tituloReporte: string = 'Reporte de Solicitudes';

  filtros = {
    fechaInicio: '',
    fechaFin: '',
    estado: null
  };

  estados = [
    { id: '', nombre: 'Todos' },
    { id: 1, nombre: 'Registrado' },
    { id: 2, nombre: 'Asignado' },
    { id: 3, nombre: 'En proceso' },
    { id: 4, nombre: 'Entregado' },
    { id: 5, nombre: 'Verificado' }
  ];

  mostrarReporteSolicitudes: boolean = true;
  mostrarReporteCiudadanos: boolean = false;
  mostrarReporteAyudas: boolean = false;

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.cargarReporteSolicitudes();
  }

  cargarTodo(): void {
    this.filtros = {
      fechaInicio: '',
      fechaFin: '',
      estado: null
    };
    this.cargarReporteSolicitudes();
  }

  limpiarFiltros(): void {
    this.cargarTodo();
  }

  aplicarFiltros(): void {
    this.cargarReporteSolicitudes();
  }

  cargarReporteSolicitudes(): void {
    const filtrosAEnviar = 
      this.filtros.fechaInicio || this.filtros.fechaFin || this.filtros.estado 
        ? this.filtros 
        : undefined;

    this.reportesService.obtenerReporteSolicitudes(filtrosAEnviar).subscribe({
      next: (data: ReporteSolicitud[]) => {
        if (data.length === 0) {
          this.hayDatos = false;
          this.mensajeNoData = this.construirMensajeNoData();
        } else {
          this.hayDatos = true;
          this.generarGrafico(data);
        }
      },
      error: (error: string) => {
        this.hayDatos = false;
        this.mensajeNoData = error;
        console.error('Error:', error);
      }
    });
  }

  private construirMensajeNoData(): string {
    const partes = [];
    
    if (this.filtros.estado) {
      const estadoNombre = this.estados.find(e => e.id === this.filtros.estado)?.nombre;
      partes.push(`estado "${estadoNombre}"`);
    }
    
    if (this.filtros.fechaInicio && this.filtros.fechaFin) {
      partes.push(`período del ${this.filtros.fechaInicio} al ${this.filtros.fechaFin}`);
    } else if (this.filtros.fechaInicio) {
      partes.push(`fecha desde ${this.filtros.fechaInicio}`);
    } else if (this.filtros.fechaFin) {
      partes.push(`fecha hasta ${this.filtros.fechaFin}`);
    }

    if (partes.length > 0) {
      return `No se encontraron solicitudes con ${partes.join(' y ')}`;
    }
    
    return 'No hay solicitudes registradas en el sistema';
  }

  private generarGrafico(data: ReporteSolicitud[]): void {
    const datosFiltrados = this.filtros.estado 
      ? data.filter(item => item.id_estado_solicitud === this.filtros.estado)
      : data;
    
    this.hayDatos = datosFiltrados.length > 0;
    
    if (!this.hayDatos) {
      this.mensajeNoData = this.filtros.estado 
        ? `No hay solicitudes en estado "${this.estados.find(e => e.id === this.filtros.estado)?.nombre}"`
        : 'No hay solicitudes para mostrar';

      if (this.chart) {
        this.chart.destroy();
      }
      
      const ctx = document.getElementById('reporteChart') as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Sin datos'],
          datasets: [{
            data: [0],
            backgroundColor: '#e9ecef',
            borderColor: '#dee2e6',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        }
      });
      return;
    }
    
    const datosOrdenados = datosFiltrados.sort((a, b) => a.id_estado_solicitud - b.id_estado_solicitud);
    
    const estadosNombres: { [key: number]: string } = {
      1: 'Registrado',
      2: 'Asignado',
      3: 'En proceso',
      4: 'Entregado',
      5: 'Verificado'
    };

    const labels = datosOrdenados.map(item => estadosNombres[item.id_estado_solicitud] || `Estado ${item.id_estado_solicitud}`);
    const cantidades = datosOrdenados.map(item => item.cantidad_solicitudes);

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('reporteChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad de Solicitudes por Estado',
          data: cantidades,
          backgroundColor: datosOrdenados.map(item => {
            switch(item.id_estado_solicitud) {
              case 1: return '#dc3545';  // Rojo - Registrado
              case 2: return '#0d6efd';  // Azul - Asignado
              case 3: return '#ffc107';  // Amarillo - En proceso
              case 4: return '#198754';  // Verde - Entregado
              case 5: return '#6c757d';  // Gris - Verificado
              default: return '#000000';
            }
          }),
          borderColor: datosOrdenados.map(item => {
            switch(item.id_estado_solicitud) {
              case 1: return '#dc3545';
              case 2: return '#0d6efd';
              case 3: return '#ffc107';
              case 4: return '#198754';
              case 5: return '#6c757d';
              default: return '#000000';
            }
          }),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                size: 11
              }
            }
          },
          x: {
            ticks: {
              font: {
                size: 11
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  cambiarTipoReporte(tipo: 'solicitudes' | 'ciudadanos' | 'ayudas'): void {
    // Resetear todos los estados
    this.mostrarReporteSolicitudes = false;
    this.mostrarReporteCiudadanos = false;
    this.mostrarReporteAyudas = false;

    this.tipoReporteActual = tipo;
    switch (tipo) {
      case 'solicitudes':
        this.tituloReporte = 'Reporte de Solicitudes';
        this.mostrarReporteSolicitudes = true;
        this.cargarReporteSolicitudes();
        break;
      case 'ciudadanos':
        this.tituloReporte = 'Reporte de Ciudadanos';
        this.mostrarReporteCiudadanos = true;
        break;
      case 'ayudas':
        this.tituloReporte = 'Reporte de Ayudas';
        this.mostrarReporteAyudas = true;
        break;
    }
  }
} 