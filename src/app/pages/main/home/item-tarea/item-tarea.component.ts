import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController,IonItem, IonItemSliding, IonCheckbox, IonLabel, IonBadge, IonItemOptions, IonItemOption } from "@ionic/angular/standalone";
import { Tarea } from 'src/app/core/interfaces/tarea.interface';
import { Trash2, Pencil, LucideAngularModule   } from 'lucide-angular';
@Component({
  selector: 'app-item-tarea',
  templateUrl: './item-tarea.component.html',
  styleUrls: ['./item-tarea.component.scss'],
  imports:[
    IonItem, IonItemSliding, IonItemOptions, IonItemOption,
    IonCheckbox,IonBadge,IonLabel,LucideAngularModule
  ]
})
export class ItemTareaComponent  implements OnInit {

  readonly Trash2 = Trash2;
  readonly Pencil = Pencil;
  @Input() tarea!: Tarea;
  @Output() clickEliminar = new EventEmitter<Tarea>(); // emite el id del botón
  @Output() clickEditar   = new EventEmitter<Tarea>();
  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {}

  colorPrioridad(prioridad: Tarea['iPrioridad']): string {
    return { 1: 'danger', 2: 'warning', 3: 'medium' }[prioridad]??'';
  }
  toggleCompletada(tarea: Tarea) {
  
  }

  async confirmarEliminar(tarea: Tarea, slidingItem: IonItemSliding) {
    this.clickEliminar.emit(tarea);
  }

  editarTarea(tarea: Tarea) {
    this.clickEliminar.emit(tarea);
  }
}
