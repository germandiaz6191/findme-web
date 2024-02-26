import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login/login';
import { GenerateManyAuth } from '../model/fakers/auth.mock';

import { LoginLocatarioService } from './login-locatario.service';

describe('LoginLocatarioService', () => {
  let service: LoginLocatarioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        LoginLocatarioService
      ]
    });

    service = TestBed.get(LoginLocatarioService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  // afterEach(() =>{
  //   httpTestingController.verify();
  // });

  it('should be created', () => {
    //const service: LoginLocatarioService = TestBed.get(LoginLocatarioService);
    expect(service).toBeTruthy();
  });

  describe('test for auth', () => {
    it('should return the credentials for user', (doneFn) => {
      //Arrange
      let login: Login = {usr: '', pwd: '', captcha: ''};

      const mockService = GenerateManyAuth();
      
      //Act
      //{...login} --> Evita problemas de mutación, pasa la referencia y no el valor
      service.auth({...login}).subscribe((data) => {
        //Assert
        expect(data.body.toString()).not.toEqual(mockService);
        doneFn();
      
      });

      //http config
      const url = `${environment.baseUrlLogin}login`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockService);
            
      //valida que el objeto que se envío al metodo, sea el mismo que envia el servicio
      expect(req.request.body).toEqual(login);
      expect(req.request.method).toEqual('POST');

      httpTestingController.verify();
    });
  });

  it('should return the rigth msg when the status code is 404', (doneFn) => {
    //Arrange
    let login: Login = {usr: '', pwd: '', captcha: ''};

    const messageError = '404 message';
    const mockService = {status: 404, statusText: messageError};
    
    //Act
    //{...login} --> Evita problemas de mutación, pasa la referencia y no el valor
    service.auth({...login}).subscribe({error: (error) => {
    
        //Assert
        expect(error.statusText).toEqual(messageError);
        doneFn();
      }
    });

    //http config
    const url = `${environment.baseUrlLogin}login`;
    const req = httpTestingController.expectOne(url);
    req.flush(messageError, mockService);
          
    //valida que el objeto que se envío al metodo, sea el mismo que envia el servicio
    expect(req.request.body).toEqual(login);
    expect(req.request.method).toEqual('POST');

    httpTestingController.verify();
  });

});
