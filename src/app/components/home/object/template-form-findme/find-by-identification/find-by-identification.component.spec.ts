import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindByIdentificationComponent } from './find-by-identification.component';

describe('FindByIdentificationComponent', () => {
  let component: FindByIdentificationComponent;
  let fixture: ComponentFixture<FindByIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindByIdentificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindByIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
