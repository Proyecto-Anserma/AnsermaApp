import { environment } from "./environment";

const PORT = environment.PORT;

export const CIUDADANO = {
    CONSULTAR_CIUDADANOS: PORT+"/ciudadanos/filtrar-ciudadanos/",
    EDITAR_CIUDADANO: PORT+"/ciudadanos/editar-ciudadano"
};

export const SOLICITUD = {
    FILTRAR_SOLICITUDES: PORT + "/solicitudes/filtrar-solicitudes/", 
    CREAR_SOLICITUD: PORT+"/solicitudes/crear-solicitud",
    EDITAR_SOLICITUD: PORT+"/solicitudes/editar-solicitud",
    ELIMINAR_SOLICITUD: PORT + "/solicitudes/eliminar-solicitud",
};

export const AYUDAS = {
    FILTRAR_AYUDAS: PORT + "/ayudas/filtrar-ayudas/",
    CREAR_AYUDA: PORT + "/ayudas/crear-ayuda",
    EDITAR_AYUDA: PORT + "/ayudas/editar-ayuda",
    ELIMINAR_AYUDA: PORT + "/ayudas/eliminar-ayuda"
};  

export const USUARIO = {
    CONSULTAR_USUARIOS: PORT+"/consultar-usuarios"
};

export const TIPO_SOLICITUD = {
    CONSULTAR_TODO: PORT +  "/tipo_solicitud/obtener_todos/"
}

export const UBICACION = {
    CONSULTAR_TODO: PORT +  "/ubicaciones/obtener_todos/"
}

export const PERTENENCIA_ETNICA = {
    CONSULTAR_TODO: PORT +  "/pertenencia_etnica/obtener_todos/"
}

export const GENERO = {
    CONSULTAR_TODO: PORT +  "/genero/obtener_todos/"
}

export const TOKEN = {
    CONSULTAR_TODO: PORT +  "/token"
}  

export const ESTADO_SOLICITUD = {
    CONSULTAR_ULTIMO_ESTADO: PORT +  "/estado_solicitudes/ultimo-estado-solicitud/",
    REPORTES_SOLICITUDES: PORT + "/estado_solicitudes/reportes-solicitudes/",
    CREAR_ESTADO: PORT +  "/estado_solicitudes/crear_estado_solicitudes/"
}

export const ESTADO = {
    CONSULTAR_TODO: PORT +  "/api/estados/"
}

export const ORIGEN_AYUDA = {
    CONSULTAR_TODO: PORT +  "/api/origenes-ayuda/",
    CREAR_ORIGEN_AYUDA: PORT +  "/api/origenes-ayuda/crear-origen-ayuda/",
}

export const CANTIDAD_ORIGEN_AYUDA = {
    CREAR_CANTIDAD_ORIGEN: PORT +  "/cantidades_origen_ayuda/crear_cantidades_origen_ayuda/",
}   



