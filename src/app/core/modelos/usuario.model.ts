export interface Usuario {
  numero_identificacion_usuario: string;
  nombre_usuario?: string;
  apellido_usuario?: string;
  fecha_nacimiento_usuario?: Date;
  correo_electronico_usuario?: string;
  telefono_usuario?: number;
  id_genero_usuario?: number;
  id_pertenencia_etnica_usuario?: number;
  id_ubicacion_usuario?: number;
  id_rol_usuario?: number;
  contrasena_usuario?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
