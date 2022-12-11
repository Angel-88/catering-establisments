import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './pages/main/main.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BaseInterceptor } from './rest/interceptors/base-interceptor';
import { FooterModule } from './shared/components/footer/footer.module';
import { SharedDataModule } from './core/services/shared-data/shared-data.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    HttpClientModule,
    FooterModule,
    SharedDataModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
