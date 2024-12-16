import { CantidadOrigenAyuda } from "./cantidad-origen-ayuda.model";
import { Solicitud } from "./solicitud.model";

export class Ayuda {
    id_ayuda: number;
    descripcion_solicitud: string;
    fecha_creacion_ayuda: Date;
    observacion_ayuda: string;
    foto_solicitud: string;
    cantidades_origen_ayuda?: CantidadOrigenAyuda[];
    solicitudes?: Solicitud[];

    constructor(
        id_ayuda: number,
        descripcion_solicitud: string,
        fecha_creacion_ayuda: Date,
        observacion_ayuda: string,
        foto_solicitud: string,
        solicitudes?: Solicitud[],
        cantidades_origen_ayuda?: CantidadOrigenAyuda[]

    ) {
        this.id_ayuda = id_ayuda;
        this.descripcion_solicitud = descripcion_solicitud;
        this.fecha_creacion_ayuda = fecha_creacion_ayuda;
        this.observacion_ayuda = observacion_ayuda;
        this.foto_solicitud = foto_solicitud;
        this.solicitudes = solicitudes;
        this.cantidades_origen_ayuda = cantidades_origen_ayuda;
    }
}
