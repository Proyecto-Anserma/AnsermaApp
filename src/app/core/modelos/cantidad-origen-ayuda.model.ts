import { Ayuda } from './ayuda.model';
import { OrigenAyuda } from './origen-ayuda.model';

export class CantidadOrigenAyuda {
    id_cantidad_origen_ayuda: number;
    cantidad_origen_ayuda: number;
    fecha_entrega_cantidad_origen_ayuda: Date;
    id_origen_ayuda: number;
    id_ayuda: number;

    // Referencias a otros modelos
    origen_ayuda?: OrigenAyuda;
    ayuda?: Ayuda;

    constructor(
        id_cantidad_origen_ayuda: number,
        cantidad_origen_ayuda: number,
        fecha_entrega_cantidad_origen_ayuda: Date,
        id_origen_ayuda: number,
        id_ayuda: number,
        origen_ayuda?: OrigenAyuda,
        ayuda?: Ayuda
    ) {
        this.id_cantidad_origen_ayuda = id_cantidad_origen_ayuda;
        this.cantidad_origen_ayuda = cantidad_origen_ayuda;
        this.fecha_entrega_cantidad_origen_ayuda = fecha_entrega_cantidad_origen_ayuda;
        this.id_origen_ayuda = id_origen_ayuda;
        this.id_ayuda = id_ayuda;
        this.origen_ayuda = origen_ayuda;
        this.ayuda = ayuda;
    }
} 