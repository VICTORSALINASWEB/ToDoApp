import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TituloConfig } from 'src/app/core/interfaces/titulo-config.interface';
import { Tarea } from 'src/app/core/interfaces/tarea.interface';
import { AppTituloComponent } from 'src/app/shared/components/app-titulo/app-titulo.component';
import {
  IonContent, IonList, IonItemSliding, IonSearchbar,
  IonFab, IonFabButton, AlertController, ModalController,
  IonCard, IonCardContent, IonCheckbox, IonBadge, IonButton, IonButtons
} from '@ionic/angular/standalone';
import {
  LucideAngularModule, Search, Plus, Trash2, Pencil, ClipboardList,
  DoorOpen, DoorClosed, List, ListTodo, ListCheck, Calendar
} from 'lucide-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MantTareaComponent } from './mant-tarea/mant-tarea.component';
import { DatePipe } from '@angular/common';
import { UiUtilService } from '../../../core/services/ui-util.service';
import { TareaService } from '../../../core/services/tarea.service';
import { UtilResponse } from 'src/app/core/interfaces/util.interface';
import { StorageService } from 'src/app/core/services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    IonBadge, IonCheckbox, IonCardContent, IonCard,
    FormsModule, AppTituloComponent,
    IonContent, IonList, IonSearchbar,
    IonFab, IonFabButton, LucideAngularModule, MatTabsModule,
    IonButtons, IonButton, DatePipe
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
  readonly Calendar = Calendar;
  readonly Search = Search;

  index = signal(1);
  terminoBusqueda = signal<string>('');

  dataTarea = signal<Tarea[]>([]);

  // Filtro base: aplica término de búsqueda sobre el título
  private filtrarPorBusqueda(tareas: Tarea[]): Tarea[] {
    const term = this.terminoBusqueda().toLowerCase().trim();
    if (!term) return tareas;
    return tareas.filter(t => (t.vTitulo??'').toLowerCase().includes(term));
  }

  // Computed por cada tab
  tareasTodas = computed(() => this.filtrarPorBusqueda(this.dataTarea()));

  tareasPendientes = computed(() =>
    this.filtrarPorBusqueda(this.dataTarea().filter(t => !t.bCompletada))
  );

  tareasCompletadas = computed(() =>
    this.filtrarPorBusqueda(this.dataTarea().filter(t => t.bCompletada))
  );

  totalPendientes = computed(() =>
     this.filtrarPorBusqueda(this.dataTarea().filter(t => !t.bCompletada)).length
  );

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private uiUtilService: UiUtilService,
    private tareaService: TareaService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.tituloConfig = {
      title: 'Tareas',
      subtitle: 'Mantenimiento de tareas',
      mostrarRefresh: true
    };

    this.cargarInformacion();
  }

  onBuscar(valor: string) {
    this.terminoBusqueda.set(valor);
  }

  async confirmarCompletada(tarea: Tarea, checkbox: IonCheckbox) {
    const vaACompletar = !tarea.bCompletada; // true = la va a marcar, false = la va a desmarcar

    const alert = await this.alertCtrl.create({
      header: vaACompletar ? 'Completar tarea' : 'Marcar como pendiente',
      message: vaACompletar
        ? `¿Estás seguro de completar la tarea: "${tarea.vTitulo}"?`
        : `¿Estás seguro de marcar como pendiente la tarea: "${tarea.vTitulo}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            checkbox.checked = (tarea.bCompletada??true);
          }
        },
        {
          text: vaACompletar ? 'Completar' : 'Marcar pendiente',
          handler: () => {
            this.dataTarea.update(lista =>
              lista.map(t => t.iIdTarea === tarea.iIdTarea ? { ...t, bCompletada: !t.bCompletada } : t)
            );
          }
        },
      ],
    });
    await alert.present();
  }
  async confirmarEliminar(tarea: Tarea) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar tarea',
      message: `¿Estás seguro de eliminar "${tarea.vTitulo}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.dataTarea.update(lista =>
              lista.filter(t => t.iIdTarea !== tarea.iIdTarea)
            );
          }
        },
      ],
    });
    await alert.present();
  }

  async nuevaTarea() {
    const modal = await this.modalCtrl.create({
      component: MantTareaComponent,
      cssClass: 'md-modal',
      animated: true,
      backdropDismiss: false
    });
    await modal.present();
    const resp = await modal.onDidDismiss();
    if (resp.data?.status === 200) {
      setTimeout(async() => {
        await this.uiUtilService.toastExito('Tarea creada exitosamente');
        await this.uiUtilService.mostrarCargando();
        let dataTareaLocal: Tarea[] = await this.storageService.obtener('aTarea')??[]
        setTimeout(async() => {
          await this.dataTarea.set(dataTareaLocal);
          await this.uiUtilService.ocultarCargando();
        }, 100);
      },100);
    }
  }

  async editaritemTarea({ iIdTarea }: Tarea) {
    const modal = await this.modalCtrl.create({
      component: MantTareaComponent,
      componentProps: { iIdTarea },
      cssClass: 'md-modal',
      animated: true,
      backdropDismiss: false
    });
    await modal.present();
    const resp = await modal.onDidDismiss();
    if (resp.data?.status === 200) {
      setTimeout(async() => {
        await this.uiUtilService.toastExito('Tarea editada exitosamente');
        await this.uiUtilService.mostrarCargando();
        let dataTareaLocal: Tarea[] = await this.storageService.obtener('aTarea')??[]
        setTimeout(async() => {
          await this.dataTarea.set(dataTareaLocal);
          await this.uiUtilService.ocultarCargando();
        }, 100);
      },100);
    }
  }

  colorPrioridad(prioridad: Tarea['iPrioridad']): string {
    return { 3: 'danger', 2: 'warning', 1: 'medium' }[(prioridad??1)] ?? '';
  }

  async cargarInformacion(){
    this.dataTarea.set([]);
    await this.uiUtilService.mostrarCargando();
    this.tareaService.listaTarea()
    .subscribe(
      {
        next: async (resp: UtilResponse) => {
          if (!resp.bSuccess ) {
            await this.uiUtilService.ocultarCargando();
            if(resp.vMessage){
              this.uiUtilService.toastAdvertencia(resp.vMessage);
            }
            return;
          }

          await this.uiUtilService.ocultarCargando();
          this.storageService.guardar('aTarea',resp.oData.aTarea);
          this.dataTarea.set((resp.oData.aTarea??[]));
        },
        error: async (err) => {
          await this.uiUtilService.ocultarCargando();
          const mensaje = err?.error?.vMessage ?? 'Hubo un error en el servicio';
          setTimeout(() => this.uiUtilService.toastAdvertencia(mensaje), 30);
        }
      }
    );

  }

  refrescarDatos(){
    this.cargarInformacion();
  }
}