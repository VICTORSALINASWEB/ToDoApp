// network.service.ts
import { Injectable, signal } from '@angular/core';
import { Network } from '@capacitor/network';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  isOnline = signal<boolean>(true);

  constructor() {
    this.init();
  }

  private async init() {
    const status = await Network.getStatus();
    this.isOnline.set(status.connected);

    Network.addListener('networkStatusChange', (status) => {
      this.isOnline.set(status.connected);
    });
  }
}
