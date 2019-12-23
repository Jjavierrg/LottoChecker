import { Component, OnInit } from '@angular/core';
import { LottoNumber } from 'src/app/shared/models/lotto-number';
import { LottoService } from 'src/app/core/services/lotto.service';
import { forkJoin, Observable } from 'rxjs';
import { finalize, max } from 'rxjs/operators';
import { ServiceEndpoint } from 'src/app/shared/models/service-endpoint';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private reloadSeconds = 60;
  private interval: any;
  private endpointHandler: Observable<ServiceEndpoint>;
  // tslint:disable-next-line: variable-name
  private _selectedNumber: LottoNumber = null;

  public numbers: LottoNumber[] = [];
  public showDeleteModal = false;
  public showAddModal = false;
  public showEditModal = false;
  public isBusy = false;
  public newItem: LottoNumber;
  public editNumber: LottoNumber = null;
  public get selectedNumber(): LottoNumber {
    return this._selectedNumber;
  }
  public set selectedNumber(value: LottoNumber) {
    this._selectedNumber = value;
    this.editNumber = value ? new LottoNumber(value) : null;
  }

  constructor(private lottoService: LottoService) {
    this.endpointHandler = lottoService.getEndpointHandler();
    this.endpointHandler.subscribe(_ => this.loadNumbers());
  }

  ngOnInit(): void {
    this.loadNumbers();
    this.startTimer();
  }

  public openNewDialog() {
    this.newItem = new LottoNumber({ amount: 20, number: 0, description: '' });
    this.showAddModal = true;
  }

  public addNewNumber(lottoNumber: LottoNumber) {
    this.showAddModal = false;
    const maxItem = this.numbers.reduce((previous, current) => {
      return previous.id > current.id ? previous : current;
    }, new LottoNumber({id: 0}));

    lottoNumber.id = maxItem.id + 1;
    this.numbers.push(new LottoNumber(lottoNumber));
    this.lottoService.saveUserNumbers(this.numbers);
  }

  public deleteNumber(lottoNumber: LottoNumber) {
    this.numbers = this.numbers.filter(x => x !== lottoNumber);
    this.showDeleteModal = false;
    this.lottoService.saveUserNumbers(this.numbers);
  }

  public updateNumber(lottoNumber: LottoNumber) {
    const index = this.numbers.findIndex(x => x.id === lottoNumber.id);
    this.numbers[index] = new LottoNumber(lottoNumber);
    this.showEditModal = false;
    this.lottoService.saveUserNumbers(this.numbers);
  }

  public checkNumbers(): void {
    if (this.isBusy) {
      return;
    }

    this.isBusy = true;

    const tasks = this.numbers.map(ticket => {
      return this.lottoService.checkNumber(ticket.number);
    });

    forkJoin(tasks)
      .pipe(finalize(() => (this.isBusy = false)))
      .subscribe(result => {
        result.forEach(x => {
          this.numbers.filter(n => n.number === x.numero).forEach(ticket => {
            ticket.price = x.premio > 0 ? (x.premio * ticket.amount) / 20 : null;
            ticket.status = x.status;
          });
        });

        this.lottoService.saveUserNumbers(this.numbers);
      });
  }

  private startTimer() {
    this.interval = setInterval(
      () => this.checkNumbers(),
      this.reloadSeconds * 1000
    );
  }

  private loadNumbers() {
    this.numbers = this.lottoService.getUserNumbers();
  }
}
