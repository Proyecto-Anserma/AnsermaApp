export class Ubicacion {
    id_ubicacion: number;
    descripcion_ubicacion: string;
    id_tipo_ubicacion: number;
    

    constructor(
        id_ubicacion: number,
        descripcion_ubicacion: string,
        id_tipo_ubicacion: number,
        
    ) {
        this.id_ubicacion = id_ubicacion;
        this.descripcion_ubicacion = descripcion_ubicacion;
        this.id_tipo_ubicacion = id_tipo_ubicacion;
    }
}
