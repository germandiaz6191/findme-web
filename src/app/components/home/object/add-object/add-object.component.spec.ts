import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjectComponent } from './add-object.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

describe('AddObjectComponent', () => {
  let component: AddObjectComponent;
  let fixture: ComponentFixture<AddObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObjectComponent ],
      imports: [
        HttpClientModule,
        NgxSpinnerModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
