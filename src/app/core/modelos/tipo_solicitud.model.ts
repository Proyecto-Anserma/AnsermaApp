export class TipoSolicitud {
    id_tipo_solicitud: number;
    descripcion_tipo_solicitud: string;
    

    constructor(
        id_tipo_solicitud: number,
        descripcion_tipo_solicitud: string,
        
    ) {
        this.id_tipo_solicitud = id_tipo_solicitud;
        this.descripcion_tipo_solicitud = descripcion_tipo_solicitud;
    }
}
