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
      this.genero = genero;
      this.pertenencia_etnica = pertenencia_etnica;
      this.ubicacion = ubicacion;
    }
  }