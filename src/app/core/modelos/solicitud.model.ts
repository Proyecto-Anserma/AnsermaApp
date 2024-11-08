export class Solicitud {
  descripcion_solicitud: string;
  fecha_creacion_solicitud: Date;
  foto_solicitud: string;
  geolocalizacion: string;
  tipo_solicitud: Int16Array;
  ubicacion_solicitud: Int16Array;
  ciudadano_solicitud: Int16Array;

  constructor(
      descripcion_solicitud: string,
      fecha_creacion_solicitud: Date,
      foto_solicitud: string,
      geolocalizacion: string,
      tipo_solicitud: Int16Array,
      ubicacion_solicitud: Int16Array,
      ciudadano_solicitud: Int16Array
  ) {
    this.descripcion_solicitud = descripcion_solicitud;
    this.fecha_creacion_solicitud = fecha_creacion_solicitud;
    this.foto_solicitud = foto_solicitud;
    this.geolocalizacion = geolocalizacion;
    this.tipo_solicitud = tipo_solicitud;
    this.ubicacion_solicitud = ubicacion_solicitud;
    this.ciudadano_solicitud = ciudadano_solicitud;
  }
}