import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginLocatarioService } from 'src/app/services/login-locatario.service';
import { asyncData, asyncError, mockObservable, setInputValue, setCheckboxValue, clickEvent, clickElement } from 'src/testing';
import { of, defer } from 'rxjs';

import { LoginLocatarioComponent } from './login-locatario.component';
import { By } from '@angular/platform-browser';
import { ReversePipe } from 'src/app/pipe/reverse.pipe';
import { getText, query, queryById } from 'src/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginLocatarioComponent', () => {
  let component: LoginLocatarioComponent;
  let fixture: ComponentFixture<LoginLocatarioComponent>;
  let serviceAuthSpy: jasmine.SpyObj<LoginLocatarioService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('LoginLocatarioService', ['auth']);

    TestBed.configureTestingModule({
      declarations: [ LoginLocatarioComponent, ReversePipe ],
      providers: [
        {provide: LoginLocatarioService, useValue: spy}
      ],
      imports: [
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        //HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule 
      ],
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginLocatarioComponent);
    
    component = fixture.componentInstance;

    serviceAuthSpy = TestBed.get(LoginLocatarioService) as jasmine.SpyObj<LoginLocatarioService>;

    fixture.detectChanges(); //OnInit
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fdescribe('test for onSubmit', () => {

    it('should send form', () => {
      //Arrange
      serviceAuthSpy.auth.and.returnValue(mockObservable({data: {status: 200,body: [{id: 456,name: 'name',userDetails: {password: 'token'}}]}}));
      //Act
      component.onSubmit();
      fixture.detectChanges();

      //Assert
      expect(component.msgError).toBe('');
      expect(component.isSubmit).toBeFalsy();
      expect(serviceAuthSpy.auth).toHaveBeenCalled();
    });

    it('should change the status "loading" => "Success"', fakeAsync(() => {
      //Arrange
      //emula un observable con una demora
      serviceAuthSpy.auth.and.returnValue(asyncData({data: {status: 200,body: [{id: 456,name: 'name',userDetails: {password: 'token'}}]}}));
      //Act
      component.onSubmit();
      fixture.detectChanges();

      expect(component.isSubmit).toBeTruthy;
      tick(15000); //exe, obs, setTimeout, promise
      fixture.detectChanges();
      //Assert
      expect("fsfs").toBeNull();
      expect(component.isSubmit).toBeFalsy();
    }));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      //Arrange
      //emula un observable con una demora
      serviceAuthSpy.auth.and.returnValue(asyncError({error: {status:400}}));
      //Act
      component.onSubmit();
      fixture.detectChanges();

      expect(component.isSubmit).toBeTruthy;
      expect(component.msgError).toBe('');
      tick(15000); //exe, obs, setTimeout, promise
      fixture.detectChanges();
      //Assert
      expect(component.isSubmit).toBeFalsy();
      expect(component.msgError).not.toBeNull();
      expect(component.msgError).toEqual('Se presentó un error de comunicación');
    }));

    it('should show "submit true" in <p> when btn was clicked', fakeAsync(() => {
      
      //Arrange
      const btnSubmit = fixture.debugElement.query(By.css('.btn-third'));
      //const btnSubmit = fixture.debugElement.nativeElement.querySelector('.btn-third');
      //emula un observable con una demora
      serviceAuthSpy.auth.and.returnValue(asyncError({error: {status:400}}));
      //Act
      //btnSubmit.click();
      //btnSubmit.triggerEventHandler('click', null);
      btnSubmit.nativeElement.click();
      fixture.detectChanges();
      tick(15000); //exe, obs, setTimeout, promise
      fixture.detectChanges();
      //Assert
      //expect(serviceAuthSpy.auth).toHaveBeenCalled();
      const msgEr = fixture.debugElement.query(By.css('.alert-warning'));
      expect(msgEr.nativeElement.textContent).toEqual(' Se presentó un error de comunicación ');
    }));

    it('should show the text "" reversed', () => {
      
      //Arrange
      const title = fixture.debugElement.query(By.css('h2'));
      //Act
      fixture.detectChanges();
      //Assert
      expect(title.nativeElement.textContent).toEqual('!oitis ortseun a odinevneiB');
    });

  });

  describe('test inputs html', () => {
    it('should the user be invalid from UI', () => {
      
      //const inputDe = fixture.debugElement.query(By.css('input#username'));
      const inputDe = query(fixture, 'input#username');
      const inputEl: HTMLInputElement = inputDe.nativeElement;
      
      inputEl.value = '';
      inputEl.dispatchEvent(new Event('input')); 
      inputEl.dispatchEvent(new Event('blur'));   
      
      fixture.detectChanges();
      
      //const textErrorEl = fixture.debugElement.query(By.css('span#erroruserid'));
      //const textError: HTMLInputElement = textErrorEl.nativeElement;
      
      const textError = getText(fixture, 'erroruser');
      expect(textError).toContain("Este campo es obligatorio");
    });

    it('should call service from UI', fakeAsync(() => {
      setInputValue(fixture, 'input#username', 'gddiaz');
      setInputValue(fixture, 'passid', '123456', true);
      //setCheckboxValue(fixture, 'checkterms', true);
      
      serviceAuthSpy.auth.and.returnValue(asyncData({data: {status: 200,body: [{id: 456,name: 'name',userDetails: {password: 'token'}}]}}));

      //Act
      query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('Submit'));
      //clickElement(fixture, 'btn-submit', true);

      expect(component.isSubmit).toBe(true);

      tick(15000); //exe, obs, setTimeout, promise
      fixture.detectChanges();
      //Assert
      expect(component.isSubmit).toBeFalsy();      
    }));
  });
});
