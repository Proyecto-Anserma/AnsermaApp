export class Solicitud {
  id_solicitud: number;
  descripcion_solicitud: string;
  fecha_creacion_solicitud: Date;
  geolocalizacion: string;
  tipo_solicitud: number;
  ubicacion_solicitud: number;
  ciudadano_solicitud: string;
  foto_solicitud: string;

  constructor(
      id_solicitud: number,
      descripcion_solicitud: string,
      fecha_creacion_solicitud: Date,
      geolocalizacion: string,
      tipo_solicitud: number,
      ubicacion_solicitud: number,
      ciudadano_solicitud: string,
      foto_solicitud: string
  ) {
    this.id_solicitud = id_solicitud;
    this.descripcion_solicitud = descripcion_solicitud;
    this.fecha_creacion_solicitud = fecha_creacion_solicitud;
    this.geolocalizacion = geolocalizacion;
    this.tipo_solicitud = tipo_solicitud;
    this.ubicacion_solicitud = ubicacion_solicitud;
    this.ciudadano_solicitud = ciudadano_solicitud;
    this.foto_solicitud = foto_solicitud;
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


export class SolicitudResponse {
  id_solicitud: number;
  descripcion_solicitud: string;
  fecha_creacion_solicitud: Date;
  geolocalizacion: string;
  id_tipo_solicitud: number;
  id_ubicacion_solicitud: number;
  id_ciudadano_solicitud: string;
  foto_solicitud?: string;

  constructor(
    id_solicitud: number,
    descripcion_solicitud: string,
    fecha_creacion_solicitud: Date,
    geolocalizacion: string,
    id_tipo_solicitud: number,
    id_ubicacion_solicitud: number,
    id_ciudadano_solicitud: string,
    foto_solicitud?: string
  ) {
    this.id_solicitud = id_solicitud;
    this.descripcion_solicitud = descripcion_solicitud;
    this.fecha_creacion_solicitud = fecha_creacion_solicitud;
    this.geolocalizacion = geolocalizacion;
    this.id_tipo_solicitud = id_tipo_solicitud;
    this.id_ubicacion_solicitud = id_ubicacion_solicitud;
    this.id_ciudadano_solicitud = id_ciudadano_solicitud;
    this.foto_solicitud = foto_solicitud;
  }
}

