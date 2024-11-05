import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DefaultInterceptor } from '@core/interceptors/default.interceptor';
import { APP_ROUTES } from './app.routes';

const INTERCEPTOR_PROVIDES = [{ provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    RouterModule.forRoot(APP_ROUTES),
    NgbModule,
    HttpClientModule,  // Asegúrate de importar HttpClientModule aquí
    LayoutModule,
  ],
  providers: [
    provideAnimationsAsync(),
    ...INTERCEPTOR_PROVIDES, 
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
