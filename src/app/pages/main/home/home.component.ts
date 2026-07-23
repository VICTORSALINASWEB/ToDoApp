import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TituloConfig } from 'src/app/core/interfaces/titulo-config.interface';
import { Tarea } from 'src/app/core/interfaces/tarea.interface';
import { AppTituloComponent } from 'src/app/shared/components/app-titulo/app-titulo.component';
import {
  IonContent, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
  IonCheckbox, IonLabel, IonBadge, IonSearchbar, IonSegment, IonSegmentButton,
  IonFab, IonFabButton, IonIcon, AlertController, ModalController, IonRow } from '@ionic/angular/standalone';
import { LucideAngularModule, Plus, Trash2, Pencil, ClipboardList,DoorOpen, DoorClosed, List,ListTodo,ListCheck  } from 'lucide-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { ItemTareaComponent } from './item-tarea/item-tarea.component';
import { MantTareaComponent } from './mant-tarea/mant-tarea.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ 
    FormsModule, AppTituloComponent,
    IonContent, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
    IonCheckbox, IonLabel, IonBadge, IonSearchbar, IonSegment, IonSegmentButton,
    IonFab, IonFabButton, LucideAngularModule, MatTabsModule, ItemTareaComponent
  ]
})
export class HomeComponent implements OnInit {

  tituloConfig!: TituloConfig;

  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly Pencil = Pencil;
  readonly ClipboardList = ClipboardList;
  readonly DoorOpen = DoorOpen;
  readonly DoorClosed = DoorClosed;
  readonly List = List;
  readonly ListCheck = ListCheck;
  readonly ListTodo = ListTodo;

 

  totalPendientes = 2;

  tareaPendientes: Tarea[] = [];
  tareaTodos: Tarea[] = [];
  tareaCompletadas: Tarea[] = [];
  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.tituloConfig = {
      title: 'Tareas',
      subtitle: 'Mantenimiento de tareas',
      mostrarRefresh: true
    };
  }

  onBuscar(event: any) {
    
  }

  async confirmarEliminar(tarea: Tarea, slidingItem: IonItemSliding) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar tarea',
      message: `¿Estás seguro de eliminar "${tarea.vTitulo}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => slidingItem.close() },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            
            slidingItem.close();
          }
        },
      ],
    });
    await alert.present();
  }

  async nuevaTarea() {
    const modal = await this.modalCtrl.create({
      component: MantTareaComponent,
      componentProps: { 
      },
      cssClass: 'md-modal',
      animated: true,
      backdropDismiss: false
    });
    await modal.present();
    const resp = await modal.onDidDismiss();
    if (resp.data) {
      if (resp.data.status === 200) {
      }
    }
  }

  async editarTarea({iIdTarea}: Tarea) {
    const modal = await this.modalCtrl.create({
      component: MantTareaComponent,
      componentProps: {
        iIdTarea
      },
      cssClass: 'md-modal',
      animated: true,
      backdropDismiss: false
    });
    await modal.present();
    const resp = await modal.onDidDismiss();
    if (resp.data) {
      if (resp.data.status === 200) {
      }
    }
  }
}