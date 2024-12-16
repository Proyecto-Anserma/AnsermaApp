import { Solicitud } from './solicitud.model';
import { Estado } from './estado.model';

export class EstadoSolicitud {
    id_estado_solicitud?: number;
    fecha_cambio_estado_solicitud?: Date;
    observacion_solicitud: string;
    id_solicitud: number;
    id_estado: number;

    // Referencias a otros modelos
    solicitud?: Solicitud;
    estado?: Estado;

    constructor(
        id_estado_solicitud: number,
        fecha_cambio_estado_solicitud: Date,
        observacion_solicitud: string,
        id_solicitud: number,
        id_estado: number,
        solicitud?: Solicitud,
        estado?: Estado
    ) {
        this.id_estado_solicitud = id_estado_solicitud;
        this.fecha_cambio_estado_solicitud = fecha_cambio_estado_solicitud;
        this.observacion_solicitud = observacion_solicitud;
        this.id_solicitud = id_solicitud;
        this.id_estado = id_estado;
        this.solicitud = solicitud;
        this.estado = estado;
    }
} 