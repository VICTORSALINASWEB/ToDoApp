import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonToolbar,
  IonContent,
  IonFooter,
  IonButton,
  ModalController,

} from "@ionic/angular/standalone";
import { LucideAngularModule, Save, X, CircleCheckBig,Palette } from 'lucide-angular';
import { HeaderConfig } from 'src/app/core/interfaces/header-config.interface';
import { AppHeaderComponent } from 'src/app/shared/components/app-header/app-header.component';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Prioridad } from 'src/app/core/interfaces/util.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-mant-tarea',
  templateUrl: './mant-tarea.component.html',
  styleUrls: ['./mant-tarea.component.scss'],
  imports:[
     ReactiveFormsModule,
    IonToolbar,
    IonContent,
    IonFooter,
    IonButton,
    LucideAngularModule,
    AppHeaderComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class MantTareaComponent  implements OnInit {

  readonly Save = Save;
  readonly X = X;
  readonly CircleCheckBig = CircleCheckBig;
  readonly Palette = Palette;
  config: HeaderConfig;
  tareaForm!: FormGroup;
  @Input() iIdTarea = 0;

  dataPrioridad: Prioridad[] = [
    {
      iPrioridad: 1,
      vDescripcion: 'BAJA'
    },
    {
      iPrioridad: 2,
      vDescripcion: 'MEDIA'
    },
    {
      iPrioridad: 3,
      vDescripcion: 'ALTA'
    }
  ];
  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.config = {
      title: '',
      isModal: true
    };
    this.tareaForm = this.fb.group({
      vTitulo: ['', [Validators.required, Validators.minLength(3)]],
      vDescripcion: [''],
      iPrioridad: [1, Validators.required]
    });
  }


  ngOnInit() {
    this.cargarDatos()
  }

  cargarDatos(){
    this.config.title = this.iIdTarea === 0 ? 'Nueva Tarea':'Editar Tarea'
  }

  guardar() {
    if (this.tareaForm.invalid) {
      this.tareaForm.markAllAsTouched();
      return;
    }


    this.modalCtrl.dismiss({
      status: 200,
      data: {}
    }, 'confirm');
  }

  closeClick() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
