import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons,
  IonButton, ModalController,IonMenuButton } from '@ionic/angular/standalone';
import { LucideAngularModule, X, ArrowLeft, RefreshCw, WifiOff,Wifi } from 'lucide-angular';
import { HeaderConfig } from '../../../core/interfaces/header-config.interface';
import { NetworkService } from 'src/app/core/services/network.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle,
    IonButtons, IonButton,
    LucideAngularModule, IonMenuButton
  ],
})
export class AppHeaderComponent implements OnInit {

  // ── Config de entrada ─────────────────────────────────────
  @Input() config!: HeaderConfig;

  // ── Eventos de salida ─────────────────────────────────────
  @Output() buttonClick = new EventEmitter<string>(); // emite el id del botón
  @Output() backClick   = new EventEmitter<void>();
  @Output() closeClick  = new EventEmitter<void>();
  @Output() refreshClick = new EventEmitter<void>();

  // ── Iconos internos ───────────────────────────────────────
  readonly X          = X;
  readonly ArrowLeft  = ArrowLeft;
  readonly RefreshCw  = RefreshCw;
  readonly Wifi  = Wifi;
  readonly WifiOff  = WifiOff;

  constructor(private modalCtrl: ModalController,
    public networkService: NetworkService
  ) {}

  ngOnInit(): void {}

  onBack(): void {
    this.backClick.emit();
  }

  onClose(): void {
    // Si es modal cierra automáticamente, también emite el evento
    if (this.config.isModal) {
      this.modalCtrl.dismiss(null, 'cancel');
    }
    this.closeClick.emit();
  }

  onRefresh(): void {
    this.refreshClick.emit();
  }
}
