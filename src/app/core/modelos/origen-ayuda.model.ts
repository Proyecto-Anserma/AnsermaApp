export class OrigenAyuda {
    id_origen_ayuda: number;
    nombre_entidad_origen_ayuda: string;
    nit: string;
    telefono_origen_ayuda: number;
    correo_electronico_origen_ayuda: string;
    zona_territorial_origen_ayuda: string;

    constructor(
        id_origen_ayuda: number,
        nombre_entidad_origen_ayuda: string,
        nit: string,
        telefono_origen_ayuda: number,
        correo_electronico_origen_ayuda: string,
        zona_territorial_origen_ayuda: string
    ) {
        this.id_origen_ayuda = id_origen_ayuda;
        this.nombre_entidad_origen_ayuda = nombre_entidad_origen_ayuda;
        this.nit = nit;
        this.telefono_origen_ayuda = telefono_origen_ayuda;
        this.correo_electronico_origen_ayuda = correo_electronico_origen_ayuda;
        this.zona_territorial_origen_ayuda = zona_territorial_origen_ayuda;
    }
} 