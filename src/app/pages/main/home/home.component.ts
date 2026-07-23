import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TituloConfig } from 'src/app/core/interfaces/titulo-config.interface';
import { Tarea } from 'src/app/core/interfaces/tarea.interface';
import { AppTituloComponent } from 'src/app/shared/components/app-titulo/app-titulo.component';
import {
  IonContent, IonList,   IonItemSliding,   IonSearchbar,
  IonFab, IonFabButton,   AlertController, ModalController, IonCard, IonCardContent, IonCheckbox, IonBadge } from '@ionic/angular/standalone';
import { LucideAngularModule, Plus, Trash2, Pencil, ClipboardList,DoorOpen,
   DoorClosed, List,ListTodo,ListCheck  } from 'lucide-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { ItemTareaComponent } from './item-tarea/item-tarea.component';
import { MantTareaComponent } from './mant-tarea/mant-tarea.component';
import { IonButton, IonButtons } from '@ionic/angular/standalone';
import { NetworkService } from 'src/app/core/services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonBadge, IonCheckbox, IonCardContent, IonCard,
    FormsModule, AppTituloComponent,
    IonContent, IonList,  IonSearchbar,
    IonFab, IonFabButton, LucideAngularModule, MatTabsModule, ItemTareaComponent,
    IonButtons,IonButton
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

  tareaPendientes: Tarea[] = [
    {
      iIdTarea: 1,
      bCompletada: true,
      dtFecha: new Date(),
      iPrioridad: 2,
      vTitulo: 'Prueba',
      vDescripcion: 'prueba descripción'
    },
        {
      iIdTarea: 2,
      bCompletada: true,
      dtFecha: new Date(),
      iPrioridad: 1,
      vTitulo: 'Prueba',
      vDescripcion: 'prueba descripción'
    },
        {
      iIdTarea: 3,
      bCompletada: true,
      dtFecha: new Date(),
      iPrioridad: 3,
      vTitulo: 'Prueba',
      vDescripcion: 'prueba descripción'
    }
  ];
  tareaTodos: Tarea[] = [];
  tareaCompletadas: Tarea[] = [];
  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private networkService: NetworkService
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

  async confirmarEliminar(tarea: Tarea ) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar tarea',
      message: `¿Estás seguro de eliminar "${tarea.vTitulo}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {

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


  colorPrioridad(prioridad: Tarea['iPrioridad']): string {
    return { 1: 'danger', 2: 'warning', 3: 'medium' }[prioridad]??'';
  }
  toggleCompletada(tarea: Tarea) {

  }

  async editaritemTarea({iIdTarea}: Tarea){
    console.log(iIdTarea);

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
