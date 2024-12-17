import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { ReporteSolicitud } from '../core/interfaces/reporte-solicitud.interface';
import { ReportesService } from '../core/servicios/reportes.service';
import { ESTADO_SOLICITUD, SOLICITUD } from '../environments/api-costant';
import { FormsModule } from '@angular/forms';
import { Solicitud, SolicitudFiltrar } from '../core/modelos/solicitud.model';
import { ApiService } from '../core/servicios/service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../environments/environment';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Ubicacion } from '../core/modelos/ubicacion.model';

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
  solicitudes: Solicitud[] = []; 
  private mapa!: mapboxgl.Map;
  private marcadores: mapboxgl.Marker[] = [];
  ubicacionesUnicas: Ubicacion[] = [];
  coloresUbicaciones: { [key: number]: string } = {};

  constructor(
    private reportesService: ReportesService,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.cargarReporteSolicitudes();
    this.cargarSolicitudes();
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
        this.tituloReporte = 'Reporte de Solicitudes por Ubicación';
        this.mostrarReporteCiudadanos = true;
        setTimeout(() => {
          this.inicializarMapa();
          this.agregarMarcadoresSolicitudes();
        }, 100);
        break;
      case 'ayudas':
        this.tituloReporte = 'Reporte de Ayudas';
        this.mostrarReporteAyudas = true;
        break;
    }
  }

  private inicializarMapa(): void {
    this.mapa = new mapboxgl.Map({
      container: 'mapaReportes',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-74.2973, 4.570868], // Coordenadas de Colombia
      zoom: 5,
      accessToken: environment.mapboxToken
    });
  }

  private obtenerUbicacionesUnicas(): void {
    const ubicacionesMap = new Map<number, Ubicacion>();
    
    this.solicitudes.forEach(solicitud => {
      if (solicitud.ubicacion && !ubicacionesMap.has(solicitud.ubicacion.id_ubicacion)) {
        ubicacionesMap.set(solicitud.ubicacion.id_ubicacion, solicitud.ubicacion);
      }
    });
    
    this.ubicacionesUnicas = Array.from(ubicacionesMap.values());
    
    // Asignar colores únicos a cada ubicación
    this.ubicacionesUnicas.forEach((ubicacion, index) => {
      this.coloresUbicaciones[ubicacion.id_ubicacion] = this.obtenerColorPorIndice(index);
    });
  }

  private obtenerColorPorIndice(index: number): string {
    // Array de colores predefinidos
    const colores = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
      '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
    ];
    return colores[index % colores.length];
  }

  obtenerColorUbicacion(idUbicacion: number): string {
    return this.coloresUbicaciones[idUbicacion] || '#000000';
  }

  contarSolicitudesPorUbicacion(idUbicacion: number): number {
    return this.solicitudes.filter(s => s.ubicacion?.id_ubicacion === idUbicacion).length;
  }

  private agregarMarcadoresSolicitudes(): void {
    // Limpiar marcadores existentes
    this.marcadores.forEach(marker => marker.remove());
    this.marcadores = [];
    
    // Obtener ubicaciones únicas y asignar colores
    this.obtenerUbicacionesUnicas();

    const coordenadasValidas: [number, number][] = [];

    this.solicitudes.forEach(solicitud => {
      if (solicitud.geolocalizacion && solicitud.ubicacion) {
        const coordenadas = this.extraerCoordenadas(solicitud.geolocalizacion);
        if (coordenadas[0] !== 0 && coordenadas[1] !== 0) {
          coordenadasValidas.push(coordenadas);
          
          // Crear popup con información de la solicitud
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <h6>Solicitud</h6>
              <p>${solicitud.descripcion_solicitud}</p>
              <p><strong>Ubicación:</strong> ${solicitud.ubicacion.descripcion_ubicacion}</p>
            `);

          // Crear marcador con el color correspondiente a la ubicación
          const el = document.createElement('div');
          el.className = 'marcador';
          el.style.backgroundColor = this.obtenerColorUbicacion(solicitud.ubicacion.id_ubicacion);
          el.style.width = '15px';
          el.style.height = '15px';
          el.style.borderRadius = '50%';
          el.style.border = '2px solid white';

          const marker = new mapboxgl.Marker(el)
            .setLngLat(coordenadas)
            .setPopup(popup)
            .addTo(this.mapa);

          this.marcadores.push(marker);
        }
      }
    });

    // Ajustar el mapa a los marcadores
    if (coordenadasValidas.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      coordenadasValidas.forEach(coord => bounds.extend(coord));
      this.mapa.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }

  private extraerCoordenadas(geoString: string): [number, number] {
    const match = geoString.match(/POINT\s?\(([-\d.]+)\s+([-\d.]+)\)/);
    return match ? [parseFloat(match[1]), parseFloat(match[2])] : [0, 0];
  }

  cargarSolicitudes(): void {
    const filtro = new SolicitudFiltrar('', ''); 

    this.apiService.post(SOLICITUD.FILTRAR_SOLICITUDES, filtro).subscribe({
      next: (respuesta: Solicitud[]) => {
        this.solicitudes = respuesta;

        console.log(this.solicitudes[0].estados);
      },
      error: (error) => {
        console.error('Error al cargar solicitudes: ', error);
      }
    });
  }
} 