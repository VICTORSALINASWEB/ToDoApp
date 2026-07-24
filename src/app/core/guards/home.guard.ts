import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service'; 
 
export const homeGuard: CanActivateFn = () => {

  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  const token = localStorageService.obtenerToken();
  if (token) { 
    router.navigateByUrl('/main/inicio');
    return false;
  }

  return true;
};