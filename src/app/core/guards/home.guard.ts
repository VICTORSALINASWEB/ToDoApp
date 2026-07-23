import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UsuarioLogin } from '../interfaces/usuario.interface';
 
 

export const homeGuard: CanActivateFn = () => {

  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  const token = localStorageService.obtenerToken();
  const usuario =
    localStorageService.obtenerUsuario<UsuarioLogin>();

  if (token && usuario) { 
    if (usuario.orden_rol === 1) {
      router.navigateByUrl('/super-admin/dashboard');
    } else {
      router.navigateByUrl('/main/inicio');
    }

    return false;
  }

  return true;
};