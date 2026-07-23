export interface Tarea {
  iIdTarea: number;
  vTitulo: string;
  vDescripcion?: string;
  bCompletada: boolean;
  iPrioridad: number;
  dtFecha: Date;
}