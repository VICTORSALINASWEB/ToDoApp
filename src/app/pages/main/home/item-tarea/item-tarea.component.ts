import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController,IonRow,IonCard, IonItemSliding, IonCheckbox, IonLabel, IonBadge, IonItemOptions, IonItemOption, IonCardSubtitle, IonCardHeader, IonCardContent, IonCardTitle, IonCol, IonButtons, IonIcon, IonButton, IonToggle, IonItem } from "@ionic/angular/standalone";
import { Tarea } from 'src/app/core/interfaces/tarea.interface';
import { Trash2, Pencil, LucideAngularModule   } from 'lucide-angular';
@Component({
  selector: 'app-item-tarea',
  templateUrl: './item-tarea.component.html',
  styleUrls: ['./item-tarea.component.scss'],
  standalone: true,
  imports:[
    IonCol,IonRow,IonCardContent,IonCardHeader,IonCardTitle,IonCard,
    IonCheckbox,IonBadge,IonButtons,IonButton,LucideAngularModule, IonItem
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

}
