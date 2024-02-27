import { Component, OnInit } from '@angular/core';
import { LoginLocatarioService } from '../../services/login-locatario.service';
import { environment } from '../../../environments/environment';
import { Login } from '../../model/login/login';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

const baseUrl = environment.baseUrlAuthenticated;
const homePage = environment.homePage;

@Component({
  selector: 'app-login-locatario',
  templateUrl: './login-locatario.component.html',
  styleUrls: ['./login-locatario.component.scss', './login-image.component.scss']
})
export class LoginLocatarioComponent implements OnInit {

  user:string = '';
  pwd:string = '';
  msgError:string;
  captchaResponse:string;
  isSubmit:boolean = false;

  constructor(private serviceAuth: LoginLocatarioService, private router: Router, private spinner: NgxSpinnerService) {
   this.serviceAuth = serviceAuth;
  }

  ngOnInit() {
    
  }

  onSubmit(){
    this.spinner.show();
    this.isSubmit=true;
    this.msgError = '';
   // if(null == this.captchaResponse){
      //this.msgError = 'El captcha es requerido';
     // this.isSubmit=false;
    //  return;
    //}
    //console.log(this.captchaResponse);
    
    console.log(this.user);
    this.captchaResponse = "123"
    const login = new Login(this.user, this.pwd,this.captchaResponse);
    this.serviceAuth.auth(login)
    .pipe(
      finalize(() => this.spinner.hide())
    ).subscribe(
      data => {
        console.log(data);
        if(null != data && null != data.status){
          if(data.status == 204){
            console.log( '204: Usuario y/o constraseña incorrectos' );
            this.msgError = 'Contraseña incorrecta.';
            //grecaptcha.reset();
          } else if(data.status === 401){
            console.log( '401: Usuario y/o constraseña incorrectos' );
            this.msgError = 'Contraseña incorrecta.';
            //grecaptcha.reset();
          }else if(data.status == 200){
            localStorage.removeItem('brandsWithDependences');
            localStorage.removeItem('brandsUpdateInfoLocatario');
            document.cookie = "aWRVc2Vy="+data.body[0].id+"; text/html; charset=UTF-8; path=/";
            document.cookie = "and0U2Vzc2lvbg="+data.body[0].userDetails.password+"; text/html; charset=UTF-8; path=/";
            document.cookie = "name="+data.body[0].name+"; text/html; charset=UTF-8; path=/";
            //document.cookie = "bm9tYnJlUHJvdmVlZG9y="+data.body[0].providerName+"; text/html; charset=UTF-8; path=/";
            //document.cookie = "bml0="+data.body[0].providerNit+"; text/html; charset=UTF-8; path=/";
            
            let firstRol = data.body[0].userDetails.authorities[0].authority;
            firstRol = firstRol.split(",");
            firstRol = firstRol[0].split("ROLE_");
            
            document.cookie = "rol="+firstRol[1]+"; text/html; charset=UTF-8; path=/";
            window.location.href = baseUrl+homePage;
          }
        }
        this.isSubmit=false;
      }, error => {
        console.log(error);
        if (error.status === 400) {
          console.log('Se presentó un error de comunicación');
          this.msgError = 'Se presentó un error de comunicación';
        } else if(error.status === 401){
          console.log( '401: Usuario y/o constraseña incorrectos' );
          this.msgError = 'Contraseña incorrecta.';
          //grecaptcha.reset();
        } else if(error.status === 404){
          console.log( '401: Usuario y/o constraseña incorrectos' );
          this.msgError = 'Contraseña incorrecta.';
          //grecaptcha.reset();
        }else if(error.status == 423){
          console.log( 'Usuario bloqueado' );
          this.msgError = 'El usuario esta bloqueado o el sistema se encuenta en mantenimiento.';
        }else if(error.status == 511 || error.status == 424){
          console.log(error.status+': Error de comunicación captcha' );
          this.msgError = 'Error de comunicación captcha';
        }else{
          console.log( 'Se presentó un error de conexión mientras se intentaba consumir el servicio' );
          this.msgError = 'Se presentó un error de comunicación';
        }
        this.isSubmit=false;
      }
    );
  }
  
  signup(){
    this.router.navigate(['/signup']);
  }

  forget(){
    this.router.navigate(['/forget']);
  }

  resolved(captchaResponse: string) {
    console.log(captchaResponse);
  }
}
