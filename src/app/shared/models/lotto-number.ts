import { DrawStatus } from './draw-status.enum';

export class LottoNumber {
  public id: number;
  public number: number;
  public description: string;
  public price?: number;
  public amount: number;
  public status: DrawStatus;

  constructor(data?: Partial<LottoNumber>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
