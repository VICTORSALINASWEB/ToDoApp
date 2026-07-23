import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  IonApp,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel, 
  IonMenuToggle,
  AlertController
} from '@ionic/angular/standalone';
import {
  LayoutDashboard, 
  LogOut, 
  LucideAngularModule,
} from 'lucide-angular';
import packageInfo from './../../../../package.json';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UiUtilService } from 'src/app/core/services/ui-util.service';
import { AppHeaderComponent } from 'src/app/shared/components/app-header/app-header.component';
import { HeaderConfig } from 'src/app/core/interfaces/header-config.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonLabel, 
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    IonMenuToggle,
    IonLabel,
    AppHeaderComponent
  ],
})
export class MainComponent {

  // Íconos
  readonly LayoutDashboard = LayoutDashboard; 
  readonly LogOut          = LogOut; 

  config: HeaderConfig;
  version =  packageInfo.version;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private localStorageService: LocalStorageService,
    private storageService: StorageService,
    private uiUtilService: UiUtilService
  ) {
    this.config = {
      title: 'ToDo App',
      iMostrarMenu: true
    };
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header:    'Cerrar sesión',
      message:   '¿Seguro que desea salir de la aplicación?',
      buttons: [
        { text: 'No', role: 'cancel' },
        { text: 'Si',  role: 'confirm',  handler: async () => {
          this.uiUtilService.ocultarCargando();
          this.localStorageService.limpiartodo();
          this.storageService.limpiartodo();
          await this.router.navigate(['/login'], {
              replaceUrl: true
            });
        } },
      ],
    });
    await alert.present();
  }
}
