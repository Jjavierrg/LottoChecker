import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CoreModule } from 'src/app/core/core.module';
import { LottoTableComponent } from 'src/app/shared/components/lotto-table/lotto-table.component';

@NgModule({
  declarations: [DashboardComponent, ModalComponent, LottoTableComponent],
  imports: [CommonModule, CoreModule],
  exports: [DashboardComponent],
})
export class LottoModule {}
