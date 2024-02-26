import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAditionalInformationComponent } from './add-aditional-information.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('AddAditionalInformationComponent', () => {
  let component: AddAditionalInformationComponent;
  let fixture: ComponentFixture<AddAditionalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAditionalInformationComponent ],
      imports: [
        HttpClientModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAditionalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
