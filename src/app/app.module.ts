import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { PassportInterceptor } from './passport.interceptor';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';

registerLocaleData(ru);

@NgModule({
  declarations: [AppComponent, FormComponent, TableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzFormModule,
    NzButtonModule,
    NzGridModule,
    NzCheckboxModule,
    NzInputModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzSelectModule,
    NzTypographyModule,
    NzDividerModule,
    NzTableModule,
    NzIconModule,
    NzPaginationModule,
    NzMessageModule,
    LoginModule,
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
