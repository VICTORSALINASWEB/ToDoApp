/* =========================================================
   src/app/core/services/local-storage.service.ts
   Uso: credenciales, token, preferencias de usuario
   Motor: window.localStorage (síncrono, simple)
========================================================= */
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  // ── Escritura ─────────────────────────────────────────────
  guardar<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`[LocalStorage] Error al guardar "${key}"`, e);
    }
  }

  // ── Lectura ───────────────────────────────────────────────
  obtener<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch (e) {
      console.error(`[LocalStorage] Error al leer "${key}"`, e);
      return null;
    }
  }

  // ── Eliminar ──────────────────────────────────────────────
  eliminar(key: string): void {
    localStorage.removeItem(key);
  }

  // ── Limpiar todo ──────────────────────────────────────────
  limpiartodo(): void {
    localStorage.clear();
  }

  // ── Verificar existencia ──────────────────────────────────
  existelocal(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  // ── Atajos de uso común ───────────────────────────────────

  // Token de sesión
  guardarToken(token: string): void        { this.guardar('auth_token', token);    }
  obtenerToken(): string | null            { return this.obtener<string>('auth_token'); }
  eliminarToken(): void                   { this.eliminar('auth_token');         }

  // Usuario activo
  guardarUsuario(user: any): void             { this.guardar('obtUsuario', user);   }
  obtenerUsuario<T>(): T | null               { return this.obtener<T>('obtUsuario'); }
  eliminarUsuario(): void                    { this.eliminar('obtUsuario');       }

  // Preferencias de UI
  guardarTheme(theme: 'light' | 'dark'): void { this.guardar('theme', theme);     }
  getTheme(): 'light' | 'dark'            { return this.obtener<'light' | 'dark'>('theme') ?? 'light'; }

  // Idioma
  guardarLang(lang: string): void          { this.guardar('lang', lang);           }
  obtenerLang(): string                    { return this.obtener<string>('lang') ?? 'es'; }

   
}