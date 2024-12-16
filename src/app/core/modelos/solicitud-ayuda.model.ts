import { Solicitud } from './solicitud.model';
import { Ayuda } from './ayuda.model';

export class SolicitudAyuda {
    id_solicitud_ayuda: number;
    cantidad_solicitud_ayuda: number;
    fecha_entrega_solicitud_ayuda: Date;
    foto_entrega_solicitud_ayuda: string;
    id_solicitud: number;
    id_ayuda: number;

    // Referencias a otros modelos
    solicitud?: Solicitud;
    ayuda?: Ayuda;

    constructor(
        id_solicitud_ayuda: number,
        cantidad_solicitud_ayuda: number,
        fecha_entrega_solicitud_ayuda: Date,
        foto_entrega_solicitud_ayuda: string,
        id_solicitud: number,
        id_ayuda: number,
        solicitud?: Solicitud,
        ayuda?: Ayuda
    ) {
        this.id_solicitud_ayuda = id_solicitud_ayuda;
        this.cantidad_solicitud_ayuda = cantidad_solicitud_ayuda;
        this.fecha_entrega_solicitud_ayuda = fecha_entrega_solicitud_ayuda;
        this.foto_entrega_solicitud_ayuda = foto_entrega_solicitud_ayuda;
        this.id_solicitud = id_solicitud;
        this.id_ayuda = id_ayuda;
        this.solicitud = solicitud;
        this.ayuda = ayuda;
    }
} 