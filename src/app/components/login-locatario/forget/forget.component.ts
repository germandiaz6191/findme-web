import { Component, OnInit } from '@angular/core';
import { LoginLocatarioService } from '../../../services/login-locatario.service';
import { Login } from '../../../model/login/login';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

  user:string = '';
  pwd:string = '';
  pwdConfirm:string = '';
  msgError:string;
  captchaResponse:string;
  isSubmit:boolean = false;

  constructor(private serviceAuth: LoginLocatarioService, private router: Router, private spinner: NgxSpinnerService) { }

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
    const login = new Login(this.user, "",this.captchaResponse);
    this.serviceAuth.forget(login).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe(
      data => {
        console.log(data);
        if(data.status == 200){            
            this.msgError = 'Se envio un email a tú correo electrónico para continuar con el proceso';
          }else{
            console.log( 'Ocurrio un error enviando el email' );
            this.msgError = 'Ocurrio un error enviando el email.';
            //grecaptcha.reset();
          }
          this.isSubmit=false;
      }, error => {
        console.log(error);
        if (error.status === 400) {
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
