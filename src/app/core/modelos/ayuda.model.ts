import { CantidadOrigenAyuda } from "./cantidad-origen-ayuda.model";
import { SolicitudAyuda } from "./solicitud-ayuda.model";
import { Solicitud } from "./solicitud.model";

export class Ayuda {
    id_ayuda: number;
    descripcion_solicitud: string;
    fecha_creacion_ayuda: Date;
    observacion_ayuda: string;
    foto_solicitud: string;
    cantidades_origen_ayuda?: CantidadOrigenAyuda[];
    solicitudes_ayuda?: SolicitudAyuda[];

    constructor(
        id_ayuda: number,
        descripcion_solicitud: string,
        fecha_creacion_ayuda: Date,
        observacion_ayuda: string,
        foto_solicitud: string,
        solicitudes_ayuda?: SolicitudAyuda[],
        cantidades_origen_ayuda?: CantidadOrigenAyuda[]

    ) {
        this.id_ayuda = id_ayuda;
        this.descripcion_solicitud = descripcion_solicitud;
        this.fecha_creacion_ayuda = fecha_creacion_ayuda;
        this.observacion_ayuda = observacion_ayuda;
        this.foto_solicitud = foto_solicitud;
        this.solicitudes_ayuda = solicitudes_ayuda;
        this.cantidades_origen_ayuda = cantidades_origen_ayuda;
    }
}
