import { environment } from "./environment";

const PORT = environment.PORT;

export const CIUDADANO = {
    CONSULTAR_CIUDADANOS: PORT+"/ciudadanos/filtrar-ciudadanos/",
    EDITAR_CIUDAD: PORT+"/ciudadanos/editar-ciudadano"
};

export const SOLICITUD = {
    FILTRAR_SOLICITUDES: PORT + "/solicitudes/filtrar-solicitudes/", 
    CREAR_SOLICITUD: PORT+"/solicitudes/crear-solicitud",
    EDITAR_SOLICITUD: PORT+"/solicitudes/editar-solicitud",
    ELIMINAR_SOLICITUD: PORT + "/solicitudes/eliminar-solicitud"
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