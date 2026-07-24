export interface Tarea {
  iIdTarea: number;
  iIdUsuario: number;
  vTitulo: string;
  vDescripcion?: string;
  bCompletada: boolean;
  iPrioridad: number;
  dtFechaCreacion: Date;
  dtFechaModificacion: Date;
} 