import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../model/login/login';

const baseUrl = environment.baseUrlLogin;

@Injectable({
  providedIn: 'root'
})
export class LoginLocatarioService {

  constructor(private http: HttpClient) { }

  createHeaders() {
    return new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'});
  }

  auth(login: Login): Observable<any> {
    console.log(baseUrl + 'login');
    const httpHeaders: HttpHeaders = this.createHeaders();
    return this.http.post<any>(baseUrl + 'login', login, {headers: httpHeaders,observe: 'response'});
  }

  signUp(login: Login): Observable<any> {
    console.log(baseUrl + 'signup');
    const httpHeaders: HttpHeaders = this.createHeaders();
    return this.http.post<any>(baseUrl + 'signup', login, {headers: httpHeaders,observe: 'response'});
  }

  sendemailsingup(login: Login): Observable<any> {
    console.log(baseUrl + 'sendemailsingup');
    const httpHeaders: HttpHeaders = this.createHeaders();
    return this.http.post<any>(baseUrl + 'sendemailsingup', login, {headers: httpHeaders,observe: 'response'});
  }

  forget(login: Login): Observable<any> {
    console.log(baseUrl + 'forget');
    const httpHeaders: HttpHeaders = this.createHeaders();
    return this.http.post<any>(baseUrl + 'forget', login, {headers: httpHeaders,observe: 'response'});
  }

  changePwd(login: Login): Observable<any> {
    console.log(baseUrl + 'changepwd');
    const httpHeaders: HttpHeaders = this.createHeaders();
    return this.http.post<any>(baseUrl + 'changepwd', login, {headers: httpHeaders,observe: 'response'});
  }
  
}
