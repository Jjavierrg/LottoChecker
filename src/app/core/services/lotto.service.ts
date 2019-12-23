import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiResult } from 'src/app/shared/models/api-result';
import { ServiceEndpoint } from 'src/app/shared/models/service-endpoint';
import { UserConfigurationService } from './user-configuration.service';
import { LottoNumber } from 'src/app/shared/models/lotto-number';

@Injectable({
  providedIn: 'root'
})
export class LottoService {
  private endpointHandler: Subject<ServiceEndpoint>;
  private currentEndpoint: ServiceEndpoint;
  private endpoints: ServiceEndpoint[] = [
    new ServiceEndpoint({
      id: 1,
      description: 'Sorteo de Navidad',
      url: 'api.elpais.com/ws/LoteriaNavidadPremiados'
    }),
    new ServiceEndpoint({
      id: 2,
      description: 'Sorteo del Niño',
      url: 'api.elpais.com/ws/LoteriaNinoPremiados'
    })
  ];

  constructor(
    private http: HttpClient,
    private userConfigService: UserConfigurationService
  ) {
    const configuration = this.userConfigService.getUserConfiguration();
    const endpointIndex = configuration.endpoint;
    this.currentEndpoint = this.endpoints.find(x => x.id === endpointIndex);
    this.endpointHandler = new Subject<ServiceEndpoint>();
  }

  public getEndpoints(): Observable<ServiceEndpoint[]> {
    return of(this.endpoints);
  }

  public getCurrentEndpoint(): ServiceEndpoint {
    return this.currentEndpoint;
  }

  public getEndpointHandler(): Observable<ServiceEndpoint> {
    return this.endpointHandler.asObservable();
  }

  public notifyEndpointChange(endpoint: ServiceEndpoint): void {
    this.currentEndpoint = endpoint;
    const endpointId = endpoint ? endpoint.id : 1;
    this.userConfigService.updateUserConfiguration({ endpoint: endpointId });
    this.endpointHandler.next(endpoint);
  }

  public checkNumber(numero: number): Observable<ApiResult> {
    const url: string = this.currentEndpoint.url;
    const headers = new HttpHeaders().set(
      'Accept',
      'text/html, application/xhtml+xml, */*'
    );

    return this.http
      .get(`https://cors-anywhere.herokuapp.com/${url}?n=${numero}`, {
        withCredentials: false,
        responseType: 'text',
        headers
      })
      .pipe(
        map((res: string) => {
          const parsed: string = res.replace('busqueda=', '');
          return JSON.parse(parsed);
        })
      );
  }

  public saveUserNumbers(numbers: LottoNumber[]): void {
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(numbers));
  }

  public getUserNumbers(): LottoNumber[] {
    const key = this.getStorageKey();
    const items = localStorage.getItem(key);
    let result: LottoNumber[] = [];

    if (items) {
      result = JSON.parse(items) as LottoNumber[];
    }

    return result;
  }

  private getStorageKey(): string {
    return `LN_Service${this.currentEndpoint.id}`;
  }
}
