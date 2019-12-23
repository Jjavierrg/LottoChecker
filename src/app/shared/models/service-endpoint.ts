export class ServiceEndpoint {
  public url: string;
  public description: string;
  public id: number;

  constructor(data?: Partial<ServiceEndpoint>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
