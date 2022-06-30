import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TableComponent } from './table/table.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { metaReducers, reducers } from 'src/store/state';
import { CountEffects } from 'src/store/effects/count.effects';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormComponent,
    NavbarComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzGridModule,
    NzCheckboxModule,
    NzInputModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzSelectModule,

    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([CountEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [{ provide: NZ_I18N, useValue: ru_RU }],
  bootstrap: [AppComponent],
})
export class AppModule {}

export interface User {
  userName: string;
  password: string;
  remember: boolean;
}

export interface UserProfile {
  displayName: string;
  email: string;
  emailAdditional: string | null;
  emailMainDispatch: string;
  firstName: string;
  id: string;
  initials: string | null;
  isConfirmed: boolean;
  isDeleted: boolean;
  isMediator: string | null;
  lastName: string;
  lastUserActivityDate: string | null;
  organizationId: string | null;
  patronymic: string;
  phone: string | null;
  position: string | null;
  registrationDate: string | null;
  roleId: string;
  subdivision: string | null;
}
