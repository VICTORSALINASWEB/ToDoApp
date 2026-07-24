import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Prioridad, UtilResponse } from 'src/app/core/interfaces/util.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TareaService } from '../../../../core/services/tarea.service';
import { UiUtilService } from 'src/app/core/services/ui-util.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { IRegistroRequest } from 'src/app/core/interfaces/DTOs/Auth/iRegistroRequest';
import { FormularioTareaRegistro, Tarea } from 'src/app/core/interfaces/tarea.interface';
import { IRegistroTareaRequest } from 'src/app/core/interfaces/DTOs/Tarea/iRegistroTareaRequest';
import { IEditarTareaRequest } from 'src/app/core/interfaces/DTOs/Tarea/iEditarTareaRequest';

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
  tareaForm: FormGroup<FormularioTareaRegistro>;
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
    private modalCtrl: ModalController,
    private tareaService: TareaService,
    private uiUtilService: UiUtilService,
    private storageService: StorageService
  ) {
    this.config = {
      title: '',
      isModal: true
    };
    this.tareaForm = this.fb.group({
      vTitulo: new FormControl('', {nonNullable: true,validators:[Validators.required, Validators.minLength(3)]}),
      vDescripcion:new FormControl('',{nonNullable: true}),
      iPrioridad: new FormControl(1,{nonNullable: true,validators: [Validators.required]})
    });
  }


  ngOnInit() {
    this.cargarDatos()
  }

  async cargarDatos(){
    this.config.title = this.iIdTarea === 0 ? 'Nueva Tarea':'Editar Tarea'
    if(this.iIdTarea > 0){
      let dataTareaLocal: Tarea[] = await this.storageService.obtener('aTarea')??[]

      const {iPrioridad,vTitulo,vDescripcion}: Tarea = await dataTareaLocal.find(x=> x.iIdTarea === this.iIdTarea)??{};
      this.tareaForm.patchValue({
        iPrioridad,vTitulo,vDescripcion
      })
    }
  }

  async guardar() {
    if (this.tareaForm.invalid) {
      this.tareaForm.markAllAsTouched();
      return;
    }

    const {iPrioridad,vDescripcion,vTitulo} = this.tareaForm.value;
    
    await this.uiUtilService.mostrarCargando();

    if(this.iIdTarea === 0){
      const param: IRegistroTareaRequest = {
      prioridad: iPrioridad,
      descripcion: vDescripcion,
      titulo: vTitulo
    }
      this.tareaService.registroTarea(param)
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

              let dataTareaLocal: Tarea[] = await this.storageService.obtener('aTarea')??[]
              
              dataTareaLocal = await [...[(resp.oData.obtTarea??{})],...dataTareaLocal]
              await this.uiUtilService.ocultarCargando();
              this.storageService.guardar('aTarea',dataTareaLocal);
              this.modalCtrl.dismiss({
                status: 200,
                data: {}
              }, 'confirm');
            },
            error: async (err) => {
              await this.uiUtilService.ocultarCargando();
              const mensaje = err?.error?.vMessage ?? 'Hubo un error en el servicio';
              setTimeout(() => this.uiUtilService.toastAdvertencia(mensaje), 30);
            }
          }
        );
    }else{
        const param: IEditarTareaRequest= {
          prioridad: iPrioridad,
          descripcion: vDescripcion,
          titulo: vTitulo
        }
      this.tareaService.editarTarea(param,this.iIdTarea)
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

              let dataTareaLocal: Tarea[] = await this.storageService.obtener('aTarea')??[]
              
              dataTareaLocal = await [...[(resp.oData.obtTarea??{})],...dataTareaLocal.filter(x=> x.iIdTarea !== this.iIdTarea)]
              await this.uiUtilService.ocultarCargando();
              this.storageService.guardar('aTarea',dataTareaLocal);
              this.modalCtrl.dismiss({
                status: 200,
                data: {}
              }, 'confirm');
            },
            error: async (err) => {
              await this.uiUtilService.ocultarCargando();
              const mensaje = err?.error?.vMessage ?? 'Hubo un error en el servicio';
              setTimeout(() => this.uiUtilService.toastAdvertencia(mensaje), 30);
            }
          }
        );
    }
   
   
  }

  closeClick() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
