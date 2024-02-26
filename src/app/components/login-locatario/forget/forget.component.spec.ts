import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetComponent } from './forget.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

describe('ForgetComponent', () => {
  let component: ForgetComponent;
  let fixture: ComponentFixture<ForgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetComponent ],
      imports: [
        HttpClientModule,
        NgxSpinnerModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
