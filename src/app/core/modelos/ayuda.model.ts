export class Ayuda {
    id_ayuda: number;
    descripcion_solicitud: string;
    fecha_creacion_ayuda: Date;
    observacion_ayuda: string;
    foto_solicitud: string;

    constructor(
        id_ayuda: number,
        descripcion_solicitud: string,
        fecha_creacion_ayuda: Date,
        observacion_ayuda: string,
        foto_solicitud: string
    ) {
        this.id_ayuda = id_ayuda;
        this.descripcion_solicitud = descripcion_solicitud;
        this.fecha_creacion_ayuda = fecha_creacion_ayuda;
        this.observacion_ayuda = observacion_ayuda;
        this.foto_solicitud = foto_solicitud;
    }
}
