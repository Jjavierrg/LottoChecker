import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LottoNumber } from '../../models/lotto-number';

@Component({
  selector: 'app-lotto-table',
  templateUrl: './lotto-table.component.html',
  styleUrls: ['./lotto-table.component.css']
})
export class LottoTableComponent implements OnChanges {

  @Input() public data: LottoNumber[];
  @Output() public selectionChange = new EventEmitter<LottoNumber>();

  public selectedRow?: number;

  constructor() {
    this.selectedRow = null;
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedRow = null;
  }

  public changeSelection(index: number): void {
    this.selectedRow = index;
    this.selectionChange.emit(this.data[index]);
  }

  public getTotalPrice(): number {
    const values = this.data.map(x => x.price ? x.price : 0);
    return values.reduce((prev, curr) => prev + curr, 0);
  }

  public getTotalAmount(): number {
    const values = this.data.map(x => x.price ? x.amount : 0);
    return values.reduce((prev, curr) => prev + curr, 0);
  }
}
