 
import { Tarea } from "./tarea.interface";
import { Usuario } from "./usuario.interface"; 

export interface UtilResponse {
    iStatus:  number;
    bSuccess:  boolean;
    vMessage: string | null;
    oData:    DataUtil;
}

export interface DataUtil { 
  obtUsuario?: Usuario; 
  token?: string;
  expiraEn?: number; 
  aTarea?: Tarea[];
  obtTarea?: Tarea;
}

export interface Prioridad {  
  iPrioridad?: number;
  vDescripcion?: string; 
}

