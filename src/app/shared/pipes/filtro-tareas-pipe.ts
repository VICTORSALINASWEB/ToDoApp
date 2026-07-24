import { Pipe, PipeTransform } from '@angular/core';
import { Tarea } from 'src/app/core/interfaces/tarea.interface';

@Pipe({
  name: 'filtroTareas',
  standalone: true 
})
export class FiltroTareasPipe implements PipeTransform {

  transform(tareas: Tarea[], iEstado: 1 | 2 | 0 = 0): Tarea[] {
    if (!tareas) return [];

    switch (iEstado) {
      case 1:
        return tareas.filter(tarea => tarea.bCompletada === true);
      case 2:
        return tareas.filter(tarea => tarea.bCompletada === false);
      case 0:
      default:
        return tareas;
    }
  }

}