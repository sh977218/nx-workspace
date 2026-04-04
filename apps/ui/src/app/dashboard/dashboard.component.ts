import { Component, computed, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Highcharts from 'highcharts';
import {
  ChartConstructorType,
  HighchartsChartComponent,
} from 'highcharts-angular';

import { MaterialModule } from '../material.module';

import { ExcelComponent } from './excel.component';
import { ExcelService } from './excel.service';

@Component({
  templateUrl: './dashboard.component.html',
  styles: [
    `
      .chart {
        width: 100%;
        height: 400px;
        display: block;
      }
    `,
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    ExcelComponent,
    HighchartsChartComponent,
  ],
  providers: [ExcelService],
})
export class DashboardComponent {
  readonly excelService = inject(ExcelService);

  chartConstructor: ChartConstructorType = 'chart';

  stepForm: FormGroup = new FormGroup({
    steps: new FormArray([
      new FormGroup({}),
      new FormGroup({
        chartTypeCtrl: new FormControl('bar', [Validators.required]),
      }),
      new FormGroup({
        xAxisCtrl: new FormControl('Country'),
        yAxisCtrl: new FormControl('Segment'),
        sumCtrl: new FormControl('Gross Sales'),
      }),
    ]),
  });

  get steps(): FormArray {
    return this.stepForm.get('steps') as FormArray;
  }

  get chartType(): FormControl {
    return this.steps.get([1])?.get('chartTypeCtrl') as FormControl;
  }

  get xAxisCtrl(): FormControl {
    return this.steps.get([2])?.get('xAxisCtrl') as FormControl;
  }

  get yAxisCtrl(): FormControl {
    return this.steps.get([2])?.get('yAxisCtrl') as FormControl;
  }

  get sumCtrl(): FormControl {
    return this.steps.get([2])?.get('sumCtrl') as FormControl;
  }

  chartOptions = computed(() => {
    const rowData = this.excelService.rowData();
    const chartType = this.chartType.value;
    if (chartType.toLowerCase() === 'bar') {
      return this.generateBarData(rowData);
    }
    if (chartType.toLowerCase() === 'line') {
      return this.generateLineData(rowData);
    }
    return {};
  });

  private generateBarData(rowData: Record<string, string | number>[]) {
    const chartType = this.chartType.value;
    const xAxis = this.xAxisCtrl.value;
    const yAxis = this.yAxisCtrl.value;
    const sum = this.sumCtrl.value;
    const xAxisData = Object.groupBy(rowData, (row) => {
      return row[xAxis];
    });
    const yAxisData = Object.groupBy(rowData, (row) => {
      return row[yAxis];
    });

    const barData: { name: string; data: number[] }[] = [];
    for (const [k, v] of Object.entries(yAxisData)) {
      if (v) {
        const xAxisDataPerYAxis = Object.groupBy(v, (row) => {
          return row[xAxis];
        });
        const totalPerYAxis = [];
        for (const [, countryDataPerSegment] of Object.entries(
          xAxisDataPerYAxis,
        )) {
          if (countryDataPerSegment) {
            const total = countryDataPerSegment.reduce((acc, row) => {
              acc += Number.parseInt(row[sum] as string);
              return acc;
            }, 0);
            totalPerYAxis.push(total);
          }
        }
        barData.push({
          name: k,
          data: totalPerYAxis,
        });
      }
    }

    return {
      chart: {
        type: chartType,
      },
      title: {
        text: this.excelService.fileName(),
      },
      xAxis: {
        categories: Object.keys(xAxisData),
        title: {
          text: null,
        },
        gridLineWidth: 1,
        lineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: sum,
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
        gridLineWidth: 0,
      },
      series: barData,
    } as Highcharts.Options;
  }

  private generateLineData(rowData: Record<string, string | number>[]) {
    const chartType = this.chartType.value;
    const xAxis = this.xAxisCtrl.value;
    const yAxis = this.yAxisCtrl.value;
    const sum = this.sumCtrl.value;
    const xAxisData = Object.groupBy(rowData, (row) => {
      return row[xAxis];
    });
    const yAxisData = Object.groupBy(rowData, (row) => {
      return row[yAxis];
    });

    const lineData: { name: string; data: number[] }[] = [];
    for (const [k, v] of Object.entries(yAxisData)) {
      if (v) {
        const xAxisDataPerYAxis = Object.groupBy(v, (row) => {
          return row[xAxis];
        });
        const totalPerYAxis = [];
        for (const [, countryDataPerSegment] of Object.entries(
          xAxisDataPerYAxis,
        )) {
          if (countryDataPerSegment) {
            const total = countryDataPerSegment.reduce((acc, row) => {
              acc += Number.parseInt(row[sum] as string);
              return acc;
            }, 0);
            totalPerYAxis.push(total);
          }
        }
        lineData.push({
          name: k,
          data: totalPerYAxis,
        });
      }
    }

    return {
      chart: {
        type: chartType,
      },
      title: {
        text: this.excelService.fileName(),
      },
      xAxis: {
        categories: Object.keys(xAxisData),
        title: {
          text: null,
        },
        gridLineWidth: 1,
        lineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: sum,
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
        gridLineWidth: 0,
      },
      series: lineData,
    } as Highcharts.Options;
  }
}
