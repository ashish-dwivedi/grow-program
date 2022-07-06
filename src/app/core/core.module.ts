import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '@auth0/auth0-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TopBarComponent],
  imports: [
    AuthModule.forRoot({
      domain: 'xpns.eu.auth0.com',
      clientId: '6T0sbJR9i6Qd0RZIIGDNuBagzkY5uYwC',
      audience: 'http://localhost:3200',
      cacheLocation: 'localstorage',
    }),
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ],
  exports: [TopBarComponent],
})
export class CoreModule {}
