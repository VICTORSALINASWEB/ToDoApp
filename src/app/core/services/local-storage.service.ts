/* =========================================================
   src/app/core/services/local-storage.service.ts
   Uso: credenciales, token, preferencias de usuario
   Motor: window.localStorage (síncrono, simple)
========================================================= */
import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth_token';
const USUARIO_KEY = 'auth_usuario';
const EXPIRA_EN_KEY = 'auth_expira_en'; // timestamp absoluto en ms

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

  guardarToken(token: string, expiraEnSegundos: number): void {
    localStorage.setItem(TOKEN_KEY, token);

    const expiraEnMs = Date.now() + expiraEnSegundos * 1000;
    localStorage.setItem(EXPIRA_EN_KEY, expiraEnMs.toString());
  }

  obtenerToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  obtenerExpiracion(): number | null {
    const valor = localStorage.getItem(EXPIRA_EN_KEY);
    return valor ? parseInt(valor, 10) : null;
  }

  guardarUsuario(usuario: unknown): void {
    localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
  }

  obtenerUsuario<T>(): T | null {
    const valor = localStorage.getItem(USUARIO_KEY);
    return valor ? JSON.parse(valor) : null;
  }
 
  // Preferencias de UI
  guardarTheme(theme: 'light' | 'dark'): void { this.guardar('theme', theme);     }
  getTheme(): 'light' | 'dark'            { return this.obtener<'light' | 'dark'>('theme') ?? 'light'; }

  // Idioma
  guardarLang(lang: string): void          { this.guardar('lang', lang);           }
  obtenerLang(): string                    { return this.obtener<string>('lang') ?? 'es'; }

   
}