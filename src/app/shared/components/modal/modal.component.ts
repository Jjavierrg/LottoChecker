import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface IModalButton {
  text: string;
  style: string;
  enabled: boolean;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() public header: string;
  @Input() public okButton: IModalButton = { text: 'Aceptar', style: 'btn btn-success', enabled: true };
  @Input() public cancelButton: IModalButton = { text: 'Cancelar', style: 'btn btn-secondary', enabled: true };

  @Output() public dialogClosed = new EventEmitter<void>();
  @Output() public actionClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  public closeDialog() {
    this.dialogClosed.emit();
  }

  public actionInvoked() {
    this.actionClicked.emit();
  }

}
