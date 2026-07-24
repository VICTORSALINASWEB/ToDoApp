import { FormControl } from "@angular/forms";

export interface Tarea {
  iIdTarea?: number;
  iIdUsuario?: number;
  vTitulo?: string;
  vDescripcion?: string;
  bCompletada?: boolean;
  iPrioridad?: number;
  dtFechaCreacion?: Date;
  dtFechaModificacion?: Date;
} 

export interface FormularioTareaRegistro {
    vTitulo: FormControl<string >;
    vDescripcion: FormControl<string>;
    iPrioridad: FormControl<number>;
}
 