import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusObjectComponent } from './change-status-object.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

describe('ChangeStatusObjectComponent', () => {
  let component: ChangeStatusObjectComponent;
  let fixture: ComponentFixture<ChangeStatusObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStatusObjectComponent ],
      imports: [
        HttpClientModule,
        NgxSpinnerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStatusObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
