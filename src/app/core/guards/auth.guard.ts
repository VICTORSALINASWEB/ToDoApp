import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  const token = localStorageService.obtenerToken();
  // const expirado = localStorageService.tokenExpirado();

  // if (token && !expirado) return true;
  if (token) return true;

  // localStorageService.eliminarToken(); // limpia si expiró
  router.navigateByUrl('/login');
  return false;
};
