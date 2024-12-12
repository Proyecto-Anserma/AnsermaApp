export class PertenenciaEtnica {
    id_pertenencia_etnica: number;
    descripcion_pertenencia_etnica: string;
    
    constructor(
        id_pertenencia_etnica: number,
        descripcion_pertenencia_etnica: string
    ) {
      this.id_pertenencia_etnica = id_pertenencia_etnica;
      this.descripcion_pertenencia_etnica = descripcion_pertenencia_etnica;
    }
  }