// session-timer.service.ts
import { Injectable, inject } from '@angular/core';
import { interval, Observable, Subject, timer } from 'rxjs';
import { map, takeUntil, filter, distinctUntilChanged } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
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
  private router = inject(Router);

  private detener$ = new Subject<void>();
  private avisoMostrado = false;

  // Umbral para considerar "por expirar" (5 minutos)
  private readonly UMBRAL_AVISO_SEGUNDOS = 5 * 60;

  iniciar(): Observable<EstadoSesion> {
    this.detener$ = new Subject<void>();
    this.avisoMostrado = false;

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
    this.localStorageService.limpiartodo();
    this.router.navigateByUrl('/login');
  }
}