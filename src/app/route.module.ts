import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddObjectComponent } from './components/home/object/add-object/add-object.component';
import { GetObjectComponent } from './components/home/object/get-object/get-object.component';
import { ChangepwdComponent } from './components/login-locatario/changepwd/changepwd.component';
import { ForgetComponent } from './components/login-locatario/forget/forget.component';
import { LoginLocatarioComponent } from './components/login-locatario/login-locatario.component';
import { SignupComponent } from './components/login-locatario/signup/signup.component';
import { AddSectorComponent } from './components/home/object/template-form-findme/add-sectors/add-sector.component';
import { FindByIdentificationComponent } from './components/home/object/template-form-findme/find-by-identification/find-by-identification.component';
import { FindByCharacteristicsComponent } from './components/home/object/template-form-findme/find-by-characteristics/find-by-characteristics.component';
import { ResultFindmeComponent } from './components/home/object/result-findme/result-findme.component';

export const ROUTES: Routes = [
  /*Route Login */
  { path: 'change', component: ChangepwdComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginLocatarioComponent },
  /*FIN Route Login */
  /*Route Object */
  { path: 'getobject', component: GetObjectComponent },
  { path: 'addobject', component: AddObjectComponent },

  { path: 'addsector', component: AddSectorComponent },
  { path: 'identification', component: FindByIdentificationComponent },
  { path: 'characteristics', component: FindByCharacteristicsComponent },
  { path: 'findme/result', component: ResultFindmeComponent },
  
  /*FIN Route Object */
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
