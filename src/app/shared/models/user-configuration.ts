export class UserConfiguration {
  public endpoint: number;

  constructor(data?: Partial<UserConfiguration>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
