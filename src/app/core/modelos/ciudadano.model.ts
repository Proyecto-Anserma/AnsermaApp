export class Ciudadano {
    nombre_ciudadano: string;
    apellido_ciudadano: string;
    fecha_nacimiento_ciudadano: Date;
    correo_electronico_ciudadano: string;
    telefono_ciudadano: string;
    geolocalizacion: string;
  
    constructor(
      nombre_ciudadano: string,
      apellido_ciudadano: string,
      fecha_nacimiento_Ciudadano: Date,
      correo_electronico_ciudadano: string,
      telefono_ciudadano: string,
      geolocalizacion: string
    ) {
      this.nombre_ciudadano = nombre_ciudadano;
      this.apellido_ciudadano = apellido_ciudadano;
      this.fecha_nacimiento_ciudadano = fecha_nacimiento_Ciudadano;
      this.correo_electronico_ciudadano = correo_electronico_ciudadano;
      this.telefono_ciudadano = telefono_ciudadano;
      this.geolocalizacion = geolocalizacion;
    }
  }