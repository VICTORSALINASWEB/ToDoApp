import { FormControl } from "@angular/forms";

export interface Usuario {
  id_usuario?: string;
  id_rol?: string;
  rol?: string;
  usuario?: string;
  nombre?: string;
  celular?: string;
  estado?: number; 
  usuario_aud?: string;
  fecha_aud?: Date;

  id_sucursal?: string;
}



export interface UsuarioLogin {
  id_usuario: string;
  id_rol: string;
  rol: string;
  id_empresa: string;
  id_sucursal: string | null;
  orden_rol: number; 
}


export interface FormularioLogin {
    p_usuario: FormControl<string >;
    p_password_hash: FormControl<string>;
}


export interface UsuarioSuperAdmin {
  id: string;
  email: string;
  nombre_usuario: string;
  nombre_completo: string;
  rol: 'super_admin';
  activo: boolean;
  empresa_asignada?: string;
  ultimo_acceso: Date | null;
  usuario_aud: string;
  fecha_aud: Date;
}

