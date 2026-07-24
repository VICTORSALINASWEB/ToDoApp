import { FormControl } from "@angular/forms";

export interface Usuario {
  iIdUsuario?: number;
  vUsuario: string;
  dtFechaCreacion: Date;
}
 

export interface FormularioLogin {
    usuario: FormControl<string >;
    contrasena: FormControl<string>;
}
 

export interface FormularioRegistro {
    usuario: FormControl<string >;
    contrasena: FormControl<string>;
}
 
