import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';
import { LocalStorageService } from '../services/local-storage.service';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = async () => {
  const localStorageService = inject(LocalStorageService);
  const storageService = inject(StorageService);
  const alertCtrl = inject(AlertController);
  const router = inject(Router);

  const token = localStorageService.obtenerToken();

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }


  const expiraEnMs = localStorageService.obtenerExpiracion(); 
  
  if ((expiraEnMs && Date.now() > expiraEnMs) || expiraEnMs === null) {
    const alert = await alertCtrl.create({
      header: 'Sesión expirada',
      message: 'Tu tiempo de sesión ha terminado. Por favor, inicia sesión nuevamente.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            await localStorageService.limpiartodo();
            await storageService.limpiartodo();
          },
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss();

    router.navigateByUrl('/login');
    return false;
  }

  return true;
};