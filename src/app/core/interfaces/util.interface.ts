 
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
}

export interface Prioridad {  
  iPrioridad?: number;
  vDescripcion?: string; 
}

