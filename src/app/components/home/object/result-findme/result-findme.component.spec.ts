import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFindmeComponent } from './result-findme.component';

describe('ResultFindmeComponent', () => {
  let component: ResultFindmeComponent;
  let fixture: ComponentFixture<ResultFindmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultFindmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultFindmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
