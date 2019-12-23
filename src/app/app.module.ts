import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { LottoModule } from './modules/lotto/lotto.module';
import { AppComponent } from './app.component';
import { UserConfigurationService } from './core/services/user-configuration.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, LottoModule],
  providers: [UserConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
