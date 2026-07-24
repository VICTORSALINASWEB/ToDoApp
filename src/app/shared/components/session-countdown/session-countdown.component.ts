// session-countdown.component.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonChip, IonLabel } from '@ionic/angular/standalone';
import { LucideAngularModule, Clock } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { SessionTimerService, EstadoSesion } from '../../../core/services/session-timer.service';
import { UiUtilService } from '../../../core/services/ui-util.service';

@Component({
  selector: 'app-session-countdown',
  standalone: true,
  imports: [CommonModule, IonChip, IonLabel, LucideAngularModule],
  template: `
    @if (estado) {
      <ion-chip [color]="estado.porExpirar ? 'danger' : 'medium'" class="session-chip">
        <lucide-icon [img]="Clock" [size]="14"></lucide-icon>
        <ion-label>{{ estado.textoFormateado }}</ion-label>
      </ion-chip>
    }
  `,
  styles: [`
    .session-chip {
      height: 28px;
      font-size: 12px;
      font-weight: 700;
      gap: 4px;
    }
  `],
})
export class SessionCountdownComponent implements OnInit, OnDestroy {
  private sessionTimerService = inject(SessionTimerService);
  private uiUtilService = inject(UiUtilService);
  private sub?: Subscription;
  private avisoMostrado = false;

  readonly Clock = Clock;
  estado: EstadoSesion | null = null;

  ngOnInit(): void {
    this.sub = this.sessionTimerService.iniciar().subscribe((estado) => {
      this.estado = estado;

      if (estado.porExpirar && !this.avisoMostrado) {
        this.avisoMostrado = true;
        this.uiUtilService.toastAdvertencia(
          `Tu sesión expira en ${estado.minutos} min. Guarda tus cambios.`
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sessionTimerService.detener();
  }
}