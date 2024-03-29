import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { GenerateOneAuth } from '../model/fakers/auth.mock';
import { Login } from '../model/login/login';
import { LoginLocatarioService } from '../services/login-locatario.service';
import { TokenService } from '../services/token/token.service';

import { HeaderInterceptorService } from './header.interceptor.service';

describe('Header.InterceptorService Spy Method', () => {
  let service: LoginLocatarioService;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
      
      TestBed.configureTestingModule({

        imports: [ HttpClientTestingModule],
        providers: [
          LoginLocatarioService,
          TokenService,
          {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true}
        ]

      })
      service = TestBed.get(LoginLocatarioService);
      httpTestingController = TestBed.get(HttpTestingController);
      tokenService = TestBed.get(TokenService);
  });

  it('should be created', () => {
    const service: HeaderInterceptorService = TestBed.get(HeaderInterceptorService);
    expect(service).toBeTruthy();
  });

  describe('test for interceptor header width spyMethod', () => {
    it('should add attrib to head', () => {
      //Arrange
      let login: Login = {usr: '', pwd: '', captcha: ''};

      const mockService = GenerateOneAuth();
      spyOn(tokenService, 'getToken').and.returnValue('123');
      //Act
      //{...login} --> Evita problemas de mutación, pasa la referencia y no el valor
      service.auth({...login}).subscribe((data) => {
        console.log(data);
      });

      //http config
      const url = `${environment.baseUrlLogin}login`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockService);
      
      expect(req.request.headers.get('Interceptor')).toEqual('true');
      
      httpTestingController.verify();
    });

  });
});
