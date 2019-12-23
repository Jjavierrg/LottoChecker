import { Injectable } from '@angular/core';
import { UserConfiguration } from 'src/app/shared/models/user-configuration';

@Injectable()
export class UserConfigurationService {
  private storageKey = 'LottoUserConfig';
  private userConfiguration: UserConfiguration;

  constructor() { }

  public getUserConfiguration(): UserConfiguration {
    if (this.userConfiguration == null) {
      this.loadUserConfiguration();
    }

    return this.userConfiguration;
  }

  public updateUserConfiguration(data: Partial<UserConfiguration>): void {
    if (!data) {
      return;
    }

    if (this.userConfiguration === null) {
      this.loadUserConfiguration();
    }

    Object.assign(this.userConfiguration, data);
    this.saveUserConfiguration();
  }

  private loadUserConfiguration() {
    const serialized = localStorage.getItem(this.storageKey);
    if (serialized) {
      this.userConfiguration = JSON.parse(serialized) as UserConfiguration;
    }

    if (this.userConfiguration == null) {
      this.userConfiguration = new UserConfiguration({ endpoint: 1 });
    }
  }

  private saveUserConfiguration(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.userConfiguration));
  }
}
