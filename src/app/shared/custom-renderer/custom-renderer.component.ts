import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-renderer',
  templateUrl: './custom-renderer.component.html',
  styleUrls: ['./custom-renderer.component.scss']
})
export class CustomRendererComponent implements ICellRendererAngularComp {

  parmas:any;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.parmas=params
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }
  deleteData() {
    this.parmas.deleteData(this.parmas.data._id)
  }
  updateData() {
    this.parmas.updateData(this.parmas.data._id)
  }

}
