import { environment } from "./environment";

const PORT = environment.PORT;

export const CIUDADANO = {
    CONSULTAR_CIUDADANOS: PORT+"/consultar-ciudadanos",
    EDITAR_CIUDAD: PORT+"/editar-ciudadano"
};

export const SOLICITUD = {
    //CONSULTAR_SOLICITUDES: PORT + "/solicitudes/consultar-solicitudes/",
    FILTRAR_SOLICITUDES: PORT + "/solicitudes/filtrar-solicitudes/", 
    CONSULTAR_SOLICITUDES_USUARIO: PORT + "/solicitudes/consultar-por-usuario/",
    EDITAR_SOLICITUD: PORT+"/solicitudes/editar-solicitud"
};

export const USUARIO = {
    CONSULTAR_USUARIOS: PORT+"/consultar-usuarios"
};