// session-timer.service.ts
import { Injectable, inject } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { map, takeUntil, filter, distinctUntilChanged } from 'rxjs/operators';
import { AlertController } from '@ionic/angular/standalone';
import { LocalStorageService } from './local-storage.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

export interface EstadoSesion {
  segundosRestantes: number;
  minutos: number;
  segundos: number;
  textoFormateado: string; // "04:32"
  porExpirar: boolean;      // true cuando quedan <= 5 min
}

@Injectable({ providedIn: 'root' })
export class SessionTimerService {
  private localStorageService = inject(LocalStorageService);
  private storageService = inject(StorageService);
  private alertCtrl = inject(AlertController);
  private router = inject(Router);

  private detener$ = new Subject<void>();
  private avisoMostrado = false;
  private alertaExpiradaMostrada = false; // evita mostrar la alerta más de una vez

  // Umbral para considerar "por expirar" (5 minutos)
  private readonly UMBRAL_AVISO_SEGUNDOS = 5 * 60;

  iniciar(): Observable<EstadoSesion> {
    this.detener$ = new Subject<void>();
    this.avisoMostrado = false;
    this.alertaExpiradaMostrada = false;

    return interval(1000).pipe(
      takeUntil(this.detener$),
      map(() => this.calcularEstado()),
      filter((estado): estado is EstadoSesion => estado !== null),
      distinctUntilChanged((a, b) => a.segundosRestantes === b.segundosRestantes),
    );
  }

  detener(): void {
    this.detener$.next();
    this.detener$.complete();
  }

  private calcularEstado(): EstadoSesion | null {
    const expiraEnMs = this.localStorageService.obtenerExpiracion();

    if (!expiraEnMs) {
      return null;
    }

    const segundosRestantes = Math.max(0, Math.floor((expiraEnMs - Date.now()) / 1000));

    if (segundosRestantes <= 0) {
      this.forzarLogout();
      return null;
    }

    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;

    return {
      segundosRestantes,
      minutos,
      segundos,
      textoFormateado: `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`,
      porExpirar: segundosRestantes <= this.UMBRAL_AVISO_SEGUNDOS,
    };
  }

  private forzarLogout(): void {
    this.detener();

    if (this.alertaExpiradaMostrada) return;
    this.alertaExpiradaMostrada = true;
 
    this.mostrarAlertaExpirada();
  }

  private async mostrarAlertaExpirada(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Sesión expirada',
      message: 'Tu tiempo de sesión ha terminado. Por favor, inicia sesión nuevamente.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            await this.localStorageService.limpiartodo();
            await this.storageService.limpiartodo();
          },
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss();

    this.router.navigateByUrl('/login');
  }
}