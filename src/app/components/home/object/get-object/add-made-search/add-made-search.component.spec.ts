import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMadeSearchComponent } from './add-made-search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('AddMadeSearchComponent', () => {
  let component: AddMadeSearchComponent;
  let fixture: ComponentFixture<AddMadeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMadeSearchComponent ],
      imports: [
        HttpClientModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMadeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
