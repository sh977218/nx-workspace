import { Component, ElementRef, inject,ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
} from 'ag-grid-community';

import { convertDataToWorkbook, getHeader, populateGrid } from './excel';
import { ExcelService } from './excel.service';

ModuleRegistry.registerModules([AllCommunityModule]);

// pull out the values we're after, converting it into an array of rowData

@Component({
  selector: 'app-excel',
  template: `
    <section class="flex flex-col flex-wrap justify-between mb-5">
      <div>
        <button (click)="fileInput.click()" mat-raised-button type="button">
          Choose File
        </button>
      </div>
      <input
        #fileInput
        (change)="selectedFileChange($event)"
        hidden
        id="file"
        type="file"
      />
    </section>
    <section
      class="flex flex-col flex-wrap justify-between"
      style="width: 100%; height: 800px;"
    >
      <ag-grid-angular
        (gridReady)="onGridReady($event)"
        [columnDefs]="[]"
        [defaultColDef]="defaultColDef"
        [rowData]="[]"
        style="width: 100%; height: 100%;"
      />
    </section>
  `,
  host: {
    class: 'flex flex-col flex-grow basis-0',
  },
  imports: [MatButtonModule, AgGridAngular],
})
export class ExcelComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  private excelService = inject(ExcelService);

  defaultColDef: ColDef = {
    minWidth: 80,
    flex: 1,
  };
  private gridApi!: GridApi;

  async selectedFileChange(event: Event) {
    const file = (event?.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const data = await file.arrayBuffer();
      const workbook = convertDataToWorkbook(data);
      const rowData = populateGrid(workbook);
      const headers = getHeader(workbook);
      const columnDefs = headers.map((header) => ({
        field: header,
        minWidth: 180,
      }));
      this.excelService.rowData.set(rowData);
      this.excelService.fileName.set(workbook.SheetNames[0]);
      this.excelService.headers.set(headers);
      this.gridApi.setGridOption('rowData', rowData);
      this.gridApi.setGridOption('columnDefs', columnDefs);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
