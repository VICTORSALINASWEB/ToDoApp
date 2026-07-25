import { Component, OnInit, signal } from '@angular/core';
import packageInfo from './../../../../../package.json';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IonButton } from "@ionic/angular/standalone";
import { LogIn, LucideAngularModule,Eye,EyeOff } from 'lucide-angular';
import {MatIconModule} from '@angular/material/icon';
import { UiUtilService } from '../../../core/services/ui-util.service';
import { AuthService } from '../../../core/services/auth.service';
import { UtilResponse } from 'src/app/core/interfaces/util.interface';
import {  FormularioRegistro } from '../../../core/interfaces/usuario.interface';
import { IRegistroRequest } from 'src/app/core/interfaces/DTOs/Auth/iRegistroRequest';
import { NetworkService } from 'src/app/core/services/network.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [IonButton,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LucideAngularModule, MatIconModule,RouterLink
  ]
})
export class RegistroComponent  implements OnInit {
  hide = signal(true); 

  version =  packageInfo.version;
  form!: FormGroup<FormularioRegistro>;
  readonly LogIn = LogIn
  readonly EyeOff = EyeOff
  readonly Eye = Eye
  constructor(
    private router: Router, 
    private uiUtilService: UiUtilService,
    private authService: AuthService,
    public networkService: NetworkService
  ) {
    this.crearFormulario();
  }

  ngOnInit() {}

  crearFormulario() {
    this.form = new FormGroup({
      usuario: new FormControl('', {nonNullable: true,validators: [Validators.required]}),
      contrasena: new FormControl('',{nonNullable: true,validators: [Validators.required]}),
    });
  }

async registrarse() {

  if(!this.networkService.isOnline()){
    this.uiUtilService.toastError('No tiene conexión a internet');
    return;
  }

  if (this.form.invalid) {
    this.form.markAllAsTouched();

    this.uiUtilService.toastAdvertencia(
      'Debe completar todos los campos obligatorios.'
    );

    return;
  }

  const { contrasena, usuario } = this.form.getRawValue();

    if (usuario.trim() === '' || contrasena.trim() === '') {
      this.form.patchValue({
        usuario: usuario.trim(),
        contrasena: contrasena.trim()
      })
      this.uiUtilService.toastAdvertencia('Ingrese sus credenciales');
      return;
    }


  const param: IRegistroRequest = {
    contrasena,
    usuario
  }
  await this.uiUtilService.mostrarCargando('Registrando...');
  this.authService.register(param).subscribe({
      next: async (resp: UtilResponse) => {
        if (!resp.bSuccess ) {
          await this.uiUtilService.ocultarCargando();
          if(resp.vMessage){
            this.uiUtilService.toastAdvertencia(resp.vMessage);
          }
          return;
        }

        await this.uiUtilService.ocultarCargando();
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.uiUtilService.ocultarCargando();
        const mensaje = err?.error?.vMessage ?? 'Hubo un error al iniciar sesión';
        setTimeout(() => this.uiUtilService.toastAdvertencia(mensaje), 30);
      }
    });
  }
 
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
 

  convertirMayusculas(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = input.value.toUpperCase();

    input.value = valor;
    this.form.get('usuario')?.setValue(valor, { emitEvent: false });
  }
}
