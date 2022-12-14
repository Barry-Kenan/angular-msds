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
import { AuthGuard } from './guards/auth.guard/auth.guard';
import { PassportInterceptor } from './interceptors/passport.interceptor/passport.interceptor';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/login/login.module';
import { TableModule } from './modules/table/table.module';
import { FormModule } from './modules/new-passport-form/new-passport-form.module';
import { FullPassportFormModule } from './modules/full-passport-form/full-passport-form.module';

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
    FullPassportFormModule,
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
