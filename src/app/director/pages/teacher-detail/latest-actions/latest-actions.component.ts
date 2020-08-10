import { Component } from '@angular/core'

@Component({
  selector: 'app-latest-actions',
  templateUrl: './latest-actions.component.html',
  styleUrls: ['./latest-actions.component.scss'],
})
export class LatestActionsComponent {
  latestActions = [
    {
      title: 'Ayer',
      contents: [
        {
          type: 'Asignó contenido al grupo "Biología Celular"',
          date: '14/02/2020',
          time: '12:50pm',
        },
        {
          type: 'Creó el grupo "Biología Celular" en la clase de 6to B',
          date: '14/02/2020',
          time: '12:50pm',
        },
      ],
    },
    {
      title: 'Esta semana',
      contents: [
        {
          type: 'Asignó contenido 1ro A',
          date: '14/02/2020',
          time: '12:50pm',
        },
        {
          type: 'Inició sesión',
          date: '14/02/2020',
          time: '12:50pm',
        },
        {
          type: 'Finalizó sesión',
          date: '14/02/2020',
          time: '12:50pm',
        },
        {
          type: 'Quitó de la clase 7mo A a Lucía Torres',
          date: '14/02/2020',
          time: '12:50pm',
        },
      ],
    },
    {
      title: 'Este mes',
      contents: [
        {
          type: 'Asignó contenido 1ro A',
          date: '14/02/2020',
          time: '12:50pm',
        },
        {
          type: 'Inició sesión',
          date: '14/02/2020',
          time: '12:50pm',
        },
        {
          type: 'Finalizó sesión',
          date: '14/02/2020',
          time: '12:50pm',
        },
        {
          type: 'Quitó de la clase 7mo A a Lucía Torres',
          date: '14/02/2020',
          time: '12:50pm',
        },
      ],
    },
  ]
}
