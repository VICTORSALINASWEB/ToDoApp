/* =========================================================
   src/app/core/services/storage.service.ts
   Uso: data grande — eventos, pacientes, inventario
   Motor: @ionic/storage-angular (IndexedDB / SQLite en móvil)
========================================================= */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs'; 
@Injectable({ providedIn: 'root' })
export class StorageService {

  private _ready$ = new BehaviorSubject<boolean>(false);

  constructor(private storage: Storage) {
    this.init();
  }

  private async init(): Promise<void> {
    await this.storage.create();
    this._ready$.next(true);
  }

  // ── Esperar a que el storage esté listo ───────────────────
  get ready$(): Observable<boolean> {
    return this._ready$.asObservable();
  }

  // ── Escritura ─────────────────────────────────────────────
  async guardar<T>(key: string, value: T): Promise<void> {
    await this.storage.set(key, value);
  }

  // ── Lectura ───────────────────────────────────────────────
  async obtener<T>(key: string): Promise<T | null> {
    return await this.storage.get(key) ?? null;
  }

  // ── Eliminar ──────────────────────────────────────────────
  async eliminar(key: string): Promise<void> {
    await this.storage.remove(key);
  }

  // ── Limpiar todo ──────────────────────────────────────────
  async limpiartodo(): Promise<void> {
    await this.storage.clear();
  }

  // ── Todas las keys ────────────────────────────────────────
  async existelocal(): Promise<string[]> {
    return await this.storage.keys();
  }
 
}