import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { NgxsModule } from '@ngxs/store';
import { AuthService } from '@auth0/auth0-angular';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { UserState } from './core/store/user/user.state';
import { environment } from '../environments/environment';
import { initializeUserDetails } from './shared/constants';
import { AuthInterceptor } from './core/services/auth/auth.interceptor';
import { AppInitService } from './core/services/app-init/app-init.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppLoadingState } from './core/store/app-loading/app-loading.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppLoadingState, UserState], {
      developmentMode: !environment.production,
    }),
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUserDetails,
      deps: [AppInitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
