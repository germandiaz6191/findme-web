import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetObjectComponent } from './get-object.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

describe('GetObjectComponent', () => {
  let component: GetObjectComponent;
  let fixture: ComponentFixture<GetObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetObjectComponent ],
      imports: [
        HttpClientModule,
        NgxSpinnerModule,
        FormsModule,
        NgbPaginationModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
