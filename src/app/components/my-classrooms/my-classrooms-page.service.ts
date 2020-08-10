import { Injectable } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class MyClassroomsPageService {
  form: FormGroup
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        given_name: ['', [Validators.minLength(4), Validators.required]],
        family_name: ['', [Validators.minLength(4), Validators.required]],
        preferred_username: [
          '',
          [Validators.minLength(4), Validators.required],
        ],
        pass: ['', [Validators.minLength(4), Validators.required]],
        pass_con: ['', [Validators.minLength(4), Validators.required]],
        sub: [''],
      },
      { validator: this.passwordConfirming }
    )
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('pass').value !== c.get('pass_con').value) {
      return { invalid: true }
    }
  }

  makeColumnChart(me) {
    return {
      title: '',
      emptyText: 'No se han registrado actividades',
      font: {
        family: 'Roboto',
        size: 10,
        color: '#333333',
      },
      axis: {
        x: {
          title: 'Actividades de Medición de Aprendizaje',
          value: 'test',
          labelsEnabled: false,
        },
        y: {
          title: 'Puntajes Promedio',
          value: 'average',
          labelsEnabled: true,
          guides: {
            label: 'Mediana: ',
            me,
          },
          min: 0,
          max: 10,
        },
      },
      balloonText: '<strong>[[test]]:</strong> [[value]] puntos',
    }
  }

  makePieChart() {
    const chart = {
      title: 'Consumo por parte del curso sobre los contenidos distribuidos',
      emptyText:
        'No se ha registrado consumo de contenidos por parte del curso',
      colors: ['#00F699', '#00CCFF', '#b5b5b5'],
      font: {
        family: 'Roboto',
        size: 10,
        color: '#333333',
      },
      titleField: 'title',
      valueField: 'result',
      descriptionField: 'total',
      balloonText:
        '<strong>[[title]]:</strong> [[percents]]% (estudiantes) \n Contenidos distribuidos: [[description]]',
      minRadius: 70,
      labelsEnabled: true,
      legend: {
        enabled: false,
      },
      isClickable: false,
    }
    return chart
  }
}
