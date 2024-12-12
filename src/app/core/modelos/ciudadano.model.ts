import { Genero } from "./genero.model";
import { PertenenciaEtnica } from "./pertenencia_etnica.model";
import { Ubicacion } from "./ubicacion.model";

export class Ciudadano {
    numero_identificacion_ciudadano: number;
    nombre_ciudadano: string;
    apellido_ciudadano: string;
    fecha_nacimiento_ciudadano: Date;
    correo_electronico_ciudadano: string;
    telefono_ciudadano: string;
    geolocalizacion: string;
    id_ubicacion_ciudadano: number;
    id_pertenencia_etnica_ciudadano: number;
    id_genero_ciudadano: number;

    genero?: Genero;
    pertenencia_etnica?: PertenenciaEtnica;
    ubicacion?: Ubicacion;
  
    constructor(
      numero_identificacion_ciudadano: number,
      nombre_ciudadano: string,
      apellido_ciudadano: string,
      fecha_nacimiento_Ciudadano: Date,
      correo_electronico_ciudadano: string,
      telefono_ciudadano: string,
      geolocalizacion: string,
      id_ubicacion_ciudadano: number,
      id_pertenencia_etnica_ciudadano: number,
      id_genero_ciudadano: number,

      genero?: Genero,
      pertenencia_etnica?: PertenenciaEtnica,
      ubicacion?: Ubicacion

    ) {
      this.numero_identificacion_ciudadano = numero_identificacion_ciudadano;
      this.nombre_ciudadano = nombre_ciudadano;
      this.apellido_ciudadano = apellido_ciudadano;
      this.fecha_nacimiento_ciudadano = fecha_nacimiento_Ciudadano;
      this.correo_electronico_ciudadano = correo_electronico_ciudadano;
      this.telefono_ciudadano = telefono_ciudadano;
      this.geolocalizacion = geolocalizacion;
      this.id_ubicacion_ciudadano= id_ubicacion_ciudadano;
      this.id_pertenencia_etnica_ciudadano = id_pertenencia_etnica_ciudadano;
      this.id_genero_ciudadano = id_genero_ciudadano;

      this.genero = genero;
      this.pertenencia_etnica = pertenencia_etnica;
      this.ubicacion = ubicacion;
    }
  }