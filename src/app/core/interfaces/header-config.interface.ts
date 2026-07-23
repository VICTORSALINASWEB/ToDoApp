/* =========================================================
   src/app/core/interfaces/header-config.interface.ts
========================================================= */
 

export interface HeaderConfig {
  // ── Contenido ────────────────────────────────────────────
  title:        string;
  subtitle?:    string;

  // ── Modo ─────────────────────────────────────────────────
  isModal?:     boolean;     // true = muestra botón cerrar
  showBack?:    boolean;     // true = muestra botón atrás
 

  // ── Opciones visuales ────────────────────────────────────
  showRefresh?:  boolean;    // atajo rápido para botón refresh
  transparent?:  boolean;    // header transparente

  iMostrarMenu?: boolean;
}