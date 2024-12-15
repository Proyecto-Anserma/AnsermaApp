import { TipoSolicitud } from "./tipo_solicitud.model";
import { Ubicacion } from "./ubicacion.model";
import { EstadoSolicitud } from "./estado-solicitud.model";

export class Solicitud {
  id_solicitud?: number;
  descripcion_solicitud: string;
  fecha_creacion_solicitud?: Date;
  id_tipo_solicitud: number | null;
  id_ubicacion_solicitud: number | null;
  id_ciudadano_solicitud: string;
  geolocalizacion: string;
  foto_solicitud?: string;
  
  tipo_solicitud?: TipoSolicitud;
  ubicacion?: Ubicacion;
  estados?: EstadoSolicitud[];

  constructor(
    descripcion_solicitud: string,
    id_tipo_solicitud: number,
    id_ubicacion_solicitud: number,
    id_ciudadano_solicitud: string,
    geolocalizacion: string,
    fecha_creacion_solicitud?: Date,
    foto_solicitud?: string, 
    id_solicitud?: number,
    tipo_solicitud?: TipoSolicitud,
    ubicacion?: Ubicacion,
    estados?: EstadoSolicitud[]
  ) {
    this.id_solicitud = id_solicitud;
    this.descripcion_solicitud = descripcion_solicitud;
    this.fecha_creacion_solicitud = fecha_creacion_solicitud;
    this.id_tipo_solicitud = id_tipo_solicitud;
    this.id_ubicacion_solicitud = id_ubicacion_solicitud;
    this.id_ciudadano_solicitud = id_ciudadano_solicitud;
    this.foto_solicitud = foto_solicitud;
    this.geolocalizacion = geolocalizacion;
    this.tipo_solicitud = tipo_solicitud;
    this.ubicacion = ubicacion;
    this.estados = estados;
  }
}

export class SolicitudFiltrar {
  descripcion_solicitud?: string;
  id_ciudadano_solicitud?: string;

  constructor(
    descripcion_solicitud?: string,
    id_ciudadano_solicitud?: string
  ) {
    this.descripcion_solicitud = descripcion_solicitud;
    this.id_ciudadano_solicitud = id_ciudadano_solicitud;
  }
}