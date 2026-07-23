import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { LucideAngularModule, RefreshCcw } from 'lucide-angular';
import { TituloConfig } from 'src/app/core/interfaces/titulo-config.interface';

@Component({
  selector: 'app-titulo',
  templateUrl: './app-titulo.component.html',
  styleUrls: ['./app-titulo.component.scss'],
  standalone: true,
  imports: [IonButton, LucideAngularModule]
})
export class AppTituloComponent implements OnInit {

  @Input() config: TituloConfig = {
    title: '',
    subtitle: '',
    mostrarRefresh: false
  };

  @Output() refresh = new EventEmitter<void>();

  readonly RefreshCcw = RefreshCcw;

  constructor() { }

  ngOnInit() {}

  refrescar(): void {
    this.refresh.emit();
  }
}