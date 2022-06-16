import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [TopBarComponent],
  imports: [CommonModule, SharedModule],
  exports: [
    TopBarComponent
  ]
})
export class CoreModule {}
