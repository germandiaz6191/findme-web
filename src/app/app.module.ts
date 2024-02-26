import { BrowserModule } from '@angular/platform-browser';

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './route.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginLocatarioComponent } from './components/login-locatario/login-locatario.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { SignupComponent } from './components/login-locatario/signup/signup.component';
import { ForgetComponent } from './components/login-locatario/forget/forget.component';
import { ChangepwdComponent } from './components/login-locatario/changepwd/changepwd.component';
import { GetObjectComponent } from './components/home/object/get-object/get-object.component';
import { AddObjectComponent } from './components/home/object/add-object/add-object.component';
import { AddMadeSearchComponent } from './components/home/object/get-object/add-made-search/add-made-search.component';
import { AddAditionalInformationComponent } from './components/home/object/get-object/add-aditional-information/add-aditional-information.component';
import { ChangeStatusObjectComponent } from './components/home/object/get-object/change-status-object/change-status-object.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/general/modal/modal.component';
import { HeaderInterceptorService } from './interceptors/header.interceptor.service';
import { ReversePipe } from './pipe/reverse.pipe';
import { environment } from 'src/environments/environment';
import { AppService } from './services/general/app.service';
import { AlertNavigatorComponent } from './components/general/alert-navigator/alert-navigator.component';
import { AddSectorComponent } from './components/home/object/template-form-findme/add-sectors/add-sector.component';
import { FindByIdentificationComponent } from './components/home/object/template-form-findme/find-by-identification/find-by-identification.component';
import { FindByCharacteristicsComponent } from './components/home/object/template-form-findme/find-by-characteristics/find-by-characteristics.component';
import { ResultFindmeComponent } from './components/home/object/result-findme/result-findme.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginLocatarioComponent,
    SignupComponent,
    ForgetComponent,
    ChangepwdComponent,
    GetObjectComponent,
    AddObjectComponent,
    AddMadeSearchComponent,
    AddAditionalInformationComponent,
    ChangeStatusObjectComponent,
    ModalComponent,
    ReversePipe,
    AddSectorComponent,
    FindByIdentificationComponent,
    FindByCharacteristicsComponent,
    AlertNavigatorComponent,
    ResultFindmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot( ROUTES, { useHash: true } ),
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [
	  {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true},
	  { provide: APP_INITIALIZER, useFactory: initializer, deps: [ AppService ], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function initializer(appService : AppService): () => Promise<any> {
  return (): Promise<any> => {
      return new Promise(async (resolve) => {
        // try {
          await appService.load();
          var env = appService.settings;
          environment.baseUrlLogin = env.baseUrl;
          environment.baseUrlGeneral = env.baseUrl_api;
          environment.baseUrlAuthenticated = env.api_evento;
          //PortalproStartappModule.forRoot(environment)
          resolve(null);
      });
    };
}
