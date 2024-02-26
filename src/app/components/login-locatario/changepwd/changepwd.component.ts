import { Component, OnInit } from '@angular/core';
import { RouterStateSnapshot, Router } from '@angular/router';
import { LoginLocatarioService } from '../../../services/login-locatario.service';
import { Login } from '../../../model/login/login';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})
export class ChangepwdComponent implements OnInit {
  
  private ID_FORM_SIGNUP:number = 2;
  private ID_FORM_FORGET:number = 1;
  user:string = '';
  pwd:string = '';
  pwdConfirm:string = '';
  msgError:string;
  captchaResponse:string;
  idForm:number;
  isSubmit:boolean = false;

  constructor(private serviceAuth: LoginLocatarioService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    this.getParameterUrl(snapshot);
  }

  getParameterUrl(snapshot: RouterStateSnapshot) {
    this.user = snapshot.root.queryParamMap.get("username");
    this.captchaResponse = snapshot.root.queryParamMap.get("token");
    this.idForm = Number.parseInt(snapshot.root.queryParamMap.get("section"));
  }

  onSubmit(){
    this.isSubmit=true;
    this.msgError = '';
   // if(null == this.captchaResponse){
      //this.msgError = 'El captcha es requerido';
     // this.isSubmit=false;
    //  return;
    //}
    //console.log(this.captchaResponse);
    
    console.log(this.user);
    const login = new Login(this.user, this.pwd, this.captchaResponse);

    if(this.idForm == this.ID_FORM_SIGNUP){
      this.callServiceSignUp(login);
    }else if(this.idForm == this.ID_FORM_FORGET){
      this.callServiceForget(login);
    }else{
      this.msgError = 'Error mostrando el formulario';
    } 
  }

  callServiceForget(login:Login) {
    this.spinner.show();
    this.serviceAuth.changePwd(login).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe(
      data => {
        console.log(data);
        if(data.status == 200){            
            this.msgError = 'Contraseña actualizada exitósamente, se redirigirá al home. Inicia sesión con tus nuevas credenciales';
            this.redirectHome();
          }else{
            console.log( 'Ocurrio un error enviando el email' );
            this.msgError = 'Ocurrio un error enviando el email.';
            //grecaptcha.reset();
          }
          this.isSubmit=false;
      }, error => {
        console.log(error);
        if(error.status === 203){            
          console.log('El token expiró');
          this.msgError = 'Token expirado, por favor realiza nuevamente el proceso de Registro';
        }else if (error.status === 400) {
          console.log('Se presentó un error de comunicación');
          this.msgError = 'Se presentó un error de comunicación';
        }else{
          console.log( 'Se presentó un error de conexión mientras se intentaba consumir el servicio' );
          this.msgError = 'Se presentó un error de comunicación';
        }
        this.isSubmit=false;
      }
    );
  }

  redirectHome() {
    setTimeout(() => {
      this.router.navigate(['/login-locatario']);
    }, 5000);
  }
  
  callServiceSignUp(login:Login) {
    this.spinner.show();
    this.serviceAuth.signUp(login).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe(
      data => {
        console.log(data);
        if(data.status == 200){            
            this.msgError = 'Se creo correctamente el usuario, por favor inicia sesión ingresando el email y contraseña que definiste';
            this.redirectHome();
          }else{
            console.log( 'Ocurrio un error enviando el email' );
            this.msgError = 'Ocurrio un error enviando el email.';
            //grecaptcha.reset();
          }
          this.isSubmit=false;
      }, error => {
        console.log(error);
        if(error.status === 203){            
          console.log('El token expiró');
          this.msgError = 'Token expirado, por favor realiza nuevamente el proceso de Registro';
        }else if (error.status === 400) {
          console.log('Se presentó un error de comunicación');
          this.msgError = 'Se presentó un error de comunicación';
        }else{
          console.log( 'Se presentó un error de conexión mientras se intentaba consumir el servicio' );
          this.msgError = 'Se presentó un error de comunicación';
        }
        this.isSubmit=false;
      }
    );
  }

  resolved(captchaResponse: string) {
    console.log(captchaResponse);
  }

  backhome(){
    this.router.navigate(['/login']);
  }
}

