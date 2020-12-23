import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { UserConfigurationService } from "./services/user-configuration.service";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HttpClientModule, HttpClientJsonpModule, FormsModule],
  exports: [HttpClientModule, FormsModule, HeaderComponent],
  providers: [UserConfigurationService],
})
export class CoreModule {}
