import { Component, OnInit } from '@angular/core';
import { ServiceEndpoint } from 'src/app/shared/models/service-endpoint';
import { LottoService } from '../services/lotto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public endpoints: ServiceEndpoint[];
  public currentEndpoint: ServiceEndpoint;

  private endpointHandler: Observable<ServiceEndpoint>;

  constructor(private lottoService: LottoService) {
    this.endpointHandler = lottoService.getEndpointHandler();
    this.endpointHandler.subscribe((endpoint) => {
      const currentEnpointId = this.currentEndpoint ? this.currentEndpoint.id : 0;
      const newEnpointId = endpoint ? endpoint.id : 0;

      if (currentEnpointId !== newEnpointId) {
        this.currentEndpoint = endpoint;
      }
    });
  }

  ngOnInit() {
    this.endpoints = this.lottoService.getEndpoints();
    this.currentEndpoint = this.lottoService.getCurrentEndpoint();
  }

  public onEndpointSelect(value: string): void {
    this.currentEndpoint = this.endpoints.find((x) => x.id.toString() === value);
    this.lottoService.notifyEndpointChange(this.currentEndpoint);
  }
}
