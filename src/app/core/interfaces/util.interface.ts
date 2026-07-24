 
import { Usuario, UsuarioLogin } from "./usuario.interface"; 

export interface UtilResponse {
    iStatus:  number;
    bSuccess:  boolean;
    vMessage: string | null;
    oData:    DataUtil;
}

export interface DataUtil {
  
  aUsuario?: Usuario[];
  obtUsuario?: Usuario; 
  token?: string; 
}

export interface Prioridad {  
  iPrioridad?: number;
  vDescripcion?: string; 
}

