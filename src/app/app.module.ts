import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { PassportInterceptor } from './passport.interceptor';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { TableModule } from './table/table.module';
import { FormModule } from './form/form.module';

registerLocaleData(ru);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzMessageModule,
    LoginModule,
    TableModule,
    FormModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: ru_RU },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PassportInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
