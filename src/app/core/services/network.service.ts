// network.service.ts
import { Injectable, signal } from '@angular/core';
import { Network } from '@capacitor/network';
import { UiUtilService } from './ui-util.service';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  isOnline = signal<boolean>(true);

  constructor(
    private uiUtilService: UiUtilService
  ) {
    this.init();
  }

 private async init() {
  const status = await Network.getStatus();
  this.isOnline.set(status.connected);

  let ultimoEstado = status.connected;

  Network.addListener('networkStatusChange', (status) => {
    if (status.connected === ultimoEstado) return; // evita toasts duplicados
    ultimoEstado = status.connected;

    this.isOnline.set(status.connected);

    if (this.isOnline()) {
      this.uiUtilService.toastExito('Tiene conexión a internet');
    } else {
      this.uiUtilService.toastError('No tiene conexión a internet');
    }
  });
}
}
