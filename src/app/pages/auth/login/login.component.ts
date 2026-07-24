import { Component, OnInit, signal } from '@angular/core';
import packageInfo from './../../../../../package.json';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IonButton } from "@ionic/angular/standalone";
import { LogIn, LucideAngularModule,Eye,EyeOff } from 'lucide-angular';
import {MatIconModule} from '@angular/material/icon'; 
import { UiUtilService } from '../../../core/services/ui-util.service';
import { AuthService } from '../../../core/services/auth.service';
import { ILoginRequest } from 'src/app/core/interfaces/DTOs/Auth/ILoginRequest';
import { UtilResponse } from 'src/app/core/interfaces/util.interface';
import { FormularioLogin } from '../../../core/interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonButton,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,RouterLink,
    LucideAngularModule, MatIconModule
  ]
})
export class LoginComponent  implements OnInit {
  hide = signal(true);

  version =  packageInfo.version;
  form!: FormGroup<FormularioLogin>;
  readonly LogIn = LogIn
  readonly EyeOff = EyeOff
  readonly Eye = Eye
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService, 
    private uiUtilService: UiUtilService,
    private authService: AuthService
  ) {
    this.crearFormulario();
  }

  ngOnInit() {}

  crearFormulario() {
    this.form = new FormGroup({
      usuario: new FormControl('VICTOR', {nonNullable: true,validators: [Validators.required]}),
      contrasena: new FormControl('VICTOR',{nonNullable: true,validators: [Validators.required]}),
    });
  }

async loguearse() {

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


  const param: ILoginRequest = {
    contrasena,
    usuario 
  }
  await this.uiUtilService.mostrarCargando('Logueando...');
  this.authService.login(param).subscribe({
      next: async (resp: UtilResponse) => {
        if (!resp.bSuccess ) {
          await this.uiUtilService.ocultarCargando();
          if(resp.vMessage){
            this.uiUtilService.toastAdvertencia(resp.vMessage);
          }
          return;
        }

        const { token, obtUsuario } = resp.oData; 
        this.localStorageService.guardarToken(token??'');
        this.localStorageService.guardarUsuario(obtUsuario);
        await this.uiUtilService.ocultarCargando();
        this.router.navigateByUrl('/');
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
