import { Injectable } from '@angular/core';
import {
  AlertController,
  ActionSheetController,
  LoadingController,
  ToastController,
} from '@ionic/angular/standalone';

// ── SVG como data URI — único modo que acepta ion-icon en overlays standalone
const SVG = (path: string) =>
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'>${path}</svg>`;

const SVG_DARK = (path: string) =>
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'>${path}</svg>`;

/** Iconos SVG para Toast (stroke blanco) */
const ICONOS_TOAST = {
  exito:      SVG('<polyline points="20 6 9 17 4 12"/>'),
  error:      SVG('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
  advertencia:SVG('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
  info:       SVG('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'),
  campana:    SVG('<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'),
  sinWifi:    SVG('<line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>'),
  guardar:    SVG('<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>'),
  papelera:   SVG('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>'),
  arriba:     SVG('<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>'),
  cerrar:     SVG('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
};

/** Iconos SVG para ActionSheet (stroke currentColor) */
export const ICONOS_ACCION = {
  editar:     SVG_DARK('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>'),
  descargar:  SVG_DARK('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
  compartir:  SVG_DARK('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>'),
  eliminar:   SVG_DARK('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>'),
  cerrar:     SVG_DARK('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
  verificar:  SVG_DARK('<polyline points="20 6 9 17 4 12"/>'),
  info:       SVG_DARK('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12.01" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/>'),
  advertencia:SVG_DARK('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
};

// ── Tipos ──────────────────────────────────────────────────────────────────

export interface OpcionesConfirmar {
  encabezado?:    string;
  subEncabezado?: string;
  mensaje:        string;
  textoConfirmar?: string;
  textoCancelar?:  string;
  destructivo?:    boolean;
}

export interface OpcionesPrompt {
  encabezado:      string;
  mensaje?:        string;
  textoConfirmar?: string;
  textoCancelar?:  string;
  campos: {
    nombre:       string;
    tipo?:        'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    placeholder?: string;
    valor?:       string;
  }[];
}

export interface OpcionesSeleccion<T = string> {
  encabezado:      string;
  items:           { etiqueta: string; valor: T; marcado?: boolean }[];
  textoConfirmar?: string;
  textoCancelar?:  string;
}

export interface OpcionesToast {
  mensaje:    string;
  encabezado?: string;
  duracion?:  number;
  posicion?:  'top' | 'middle' | 'bottom';
  icono?:     string;
  cssClase?:  string;
  botones?:   any[];
}

export interface ItemAccion {
  texto:    string;
  icono?:   string;
  rol?:     'destructive' | 'cancel' | string;
  accion?:  () => void | boolean | Promise<boolean | void>;
}

// ── Servicio ───────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class UiUtilService {

  /** Iconos para ActionSheet */
  readonly iconosAccion = ICONOS_ACCION;

  private _cargando: HTMLIonLoadingElement | null = null;

  constructor(
    private alertCtrl:        AlertController,
    private hojaAccionCtrl:   ActionSheetController,
    private cargandoCtrl:     LoadingController,
    private toastCtrl:        ToastController,
  ) {}

  // ═══════════════════════════════════════════════════════════
  // ALERTS
  // ═══════════════════════════════════════════════════════════

  /** Alert informativo simple */
  async alerta(mensaje: string, encabezado = 'Información', textBoton = 'Aceptar'): Promise<void> {
    const el = await this.alertCtrl.create({ header: encabezado, message: mensaje, buttons: [textBoton] });
    await el.present();
    await el.onDidDismiss();
  }

  /**
   * Diálogo de confirmación.
   * @returns `true` si el usuario confirmó, `false` si canceló.
   */
  async confirmar(opts: OpcionesConfirmar): Promise<boolean> {
    return new Promise(async (resolve) => {
      const el = await this.alertCtrl.create({
        header:    opts.encabezado    ?? 'Confirmar',
        subHeader: opts.subEncabezado,
        message:   opts.mensaje,
        buttons: [
          {
            text:    opts.textoCancelar  ?? 'Cancelar',
            role:    'cancel',
            handler: () => resolve(false),
          },
          {
            text:    opts.textoConfirmar ?? (opts.destructivo ? 'Eliminar' : 'Confirmar'),
            role:    opts.destructivo ? 'destructive' : 'confirm',
            handler: () => resolve(true),
          },
        ],
      });
      await el.present();
    });
  }

  /**
   * Alert con uno o varios inputs de texto.
   * @returns objeto con los valores ingresados, o `null` si canceló.
   */
  async ingresar(opts: OpcionesPrompt): Promise<Record<string, string> | null> {
    return new Promise(async (resolve) => {
      const el = await this.alertCtrl.create({
        header:  opts.encabezado,
        message: opts.mensaje,
        inputs:  opts.campos.map((c) => ({
          name:        c.nombre,
          type:        c.tipo ?? 'text',
          placeholder: c.placeholder,
          value:       c.valor ?? '',
        })),
        buttons: [
          { text: opts.textoCancelar  ?? 'Cancelar', role: 'cancel', handler: () => resolve(null) },
          { text: opts.textoConfirmar ?? 'Aceptar',  handler: (data) => resolve(data) },
        ],
      });
      await el.present();
    });
  }

  /**
   * Alert con checkboxes (selección múltiple).
   * @returns array de valores seleccionados, o `null` si canceló.
   */
  async seleccionarVarios<T = string>(opts: OpcionesSeleccion<T>): Promise<T[] | null> {
    return new Promise(async (resolve) => {
      const el = await this.alertCtrl.create({
        header: opts.encabezado,
        inputs: opts.items.map((item) => ({
          type:    'checkbox' as const,
          label:   item.etiqueta,
          value:   item.valor,
          checked: item.marcado ?? false,
        })),
        buttons: [
          { text: opts.textoCancelar  ?? 'Cancelar', role: 'cancel', handler: () => resolve(null) },
          { text: opts.textoConfirmar ?? 'Aplicar',  handler: (data) => resolve(data as T[]) },
        ],
      });
      await el.present();
    });
  }

  /**
   * Alert con radio buttons (selección única).
   * @returns el valor seleccionado, o `null` si canceló.
   */
  async seleccionarUno<T = string>(opts: OpcionesSeleccion<T>): Promise<T | null> {
    return new Promise(async (resolve) => {
      const el = await this.alertCtrl.create({
        header: opts.encabezado,
        inputs: opts.items.map((item) => ({
          type:    'radio' as const,
          label:   item.etiqueta,
          value:   item.valor,
          checked: item.marcado ?? false,
        })),
        buttons: [
          { text: opts.textoCancelar  ?? 'Cancelar',    role: 'cancel', handler: () => resolve(null) },
          { text: opts.textoConfirmar ?? 'Seleccionar', handler: (data) => resolve(data as T) },
        ],
      });
      await el.present();
    });
  }

  // ═══════════════════════════════════════════════════════════
  // LOADING
  // ═══════════════════════════════════════════════════════════

async mostrarCargando(mensaje = 'Cargando...'): Promise<void> {

    if (this._cargando){

        try{
            await this._cargando.dismiss();
        }catch{}

        this._cargando = null;
    }

    this._cargando = await this.cargandoCtrl.create({
        message: mensaje,
        spinner: 'crescent'
    });

    await this._cargando.present();
}

async ocultarCargando(): Promise<void> {

    if (!this._cargando)
        return;

    try{
        await this._cargando.dismiss();
    }
    catch(e){
        console.log(e);
    }
    finally{
        this._cargando = null;
    }

}
  /**
   * Envuelve una Promise mostrando el loading automáticamente.
   * @example
   * const data = await this.ui.conCargando(() => this.api.obtenerDatos(), 'Obteniendo datos...');
   */
  async conCargando<T>(tarea: () => Promise<T>, mensaje = 'Cargando...'): Promise<T> {
    await this.mostrarCargando(mensaje);
    try {
      return await tarea();
    } finally {
      await this.ocultarCargando();
    }
  }

  // ═══════════════════════════════════════════════════════════
  // TOAST — base
  // ═══════════════════════════════════════════════════════════

  private async _mostrarToast(opts: OpcionesToast): Promise<void> {
    const el = await this.toastCtrl.create({
      header:   opts.encabezado,
      message:  opts.mensaje,
      duration: opts.duracion ?? 3000,
      position: opts.posicion ?? 'bottom',
      cssClass: opts.cssClase,
      icon:     opts.icono,
      buttons:  opts.botones ?? [{ role: 'cancel', icon: ICONOS_TOAST.cerrar }],
    });
    await el.present();
  }

  // ── Variantes de color ────────────────────────────────────

  toastExito(mensaje = 'Operación exitosa.', encabezado?: string) {
    return this._mostrarToast({
      mensaje,
      encabezado,
      cssClase: 'toast-success',
      icono:    ICONOS_TOAST.exito,
    });
  }

  toastError(mensaje = 'Ocurrió un error.', encabezado = 'Error') {
    return this._mostrarToast({
      mensaje,
      encabezado,
      cssClase: 'toast-danger',
      icono:    ICONOS_TOAST.error,
      duracion: 4000,
    });
  }

  toastAdvertencia(mensaje: string, encabezado = 'Advertencia') {
    return this._mostrarToast({
      mensaje,
      encabezado,
      cssClase: 'toast-warning',
      icono:    ICONOS_TOAST.advertencia,
      duracion: 3500,
    });
  }

  toastInfo(mensaje: string, encabezado?: string) {
    return this._mostrarToast({
      mensaje,
      encabezado,
      cssClase: 'toast-info',
      icono:    ICONOS_TOAST.info,
    });
  }

  toastNeutral(mensaje: string) {
    return this._mostrarToast({
      mensaje,
      cssClase: 'toast-neutral',
      icono:    ICONOS_TOAST.campana,
      duracion: 2000,
    });
  }

  // ── Posiciones ────────────────────────────────────────────

  toastArriba(mensaje: string) {
    return this._mostrarToast({
      mensaje,
      cssClase: 'toast-info',
      posicion: 'top',
      icono:    ICONOS_TOAST.arriba,
    });
  }

  toastCentro(mensaje: string) {
    return this._mostrarToast({
      mensaje,
      cssClase: 'toast-neutral',
      posicion: 'middle',
      icono:    ICONOS_TOAST.campana,
    });
  }

  // ── Casos de uso específicos ──────────────────────────────

  /** Toast con botón "Deshacer" */
  async toastDeshacer(mensaje: string, alDeshacer: () => void): Promise<void> {
    const el = await this.toastCtrl.create({
      message:  mensaje,
      duration: 5000,
      position: 'bottom',
      cssClass: 'toast-neutral',
      icon:     ICONOS_TOAST.papelera,
      buttons: [
        { text: 'Deshacer', handler: alDeshacer },
        { role: 'cancel',   icon: ICONOS_TOAST.cerrar },
      ],
    });
    await el.present();
  }

  /** Toast persistente de sin conexión */
  async toastSinConexion(alReintentar?: () => void): Promise<void> {
    const el = await this.toastCtrl.create({
      header:   'Sin conexión',
      message:  'Verifica tu conexión a internet.',
      duration: 0,
      position: 'bottom',
      cssClass: 'toast-danger',
      icon:     ICONOS_TOAST.sinWifi,
      buttons: [
        ...(alReintentar ? [{ text: 'Reintentar', handler: alReintentar }] : []),
        { role: 'cancel', icon: ICONOS_TOAST.cerrar },
      ],
    });
    await el.present();
  }

  /** Toast breve de guardado automático */
  toastGuardadoAuto() {
    return this._mostrarToast({
      mensaje:  'Guardado automáticamente.',
      cssClase: 'toast-success',
      icono:    ICONOS_TOAST.guardar,
      duracion: 2000,
      botones:  [],
    });
  }

  // ═══════════════════════════════════════════════════════════
  // ACTION SHEET
  // ═══════════════════════════════════════════════════════════

  async hojaDeAcciones(
    encabezado:    string,
    acciones:      ItemAccion[],
    subEncabezado?: string,
  ): Promise<void> {
    const hoja = await this.hojaAccionCtrl.create({
      header:    encabezado,
      subHeader: subEncabezado,
      buttons:   acciones.map((a) => ({
        text:    a.texto,
        icon:    a.icono,
        role:    a.rol,
        handler: a.accion,
      })),
    });
    await hoja.present();
  }
}