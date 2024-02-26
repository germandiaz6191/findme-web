import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindByCharacteristicsComponent } from './find-by-characteristics.component';

describe('FindByCharacteristicsComponent', () => {
  let component: FindByCharacteristicsComponent;
  let fixture: ComponentFixture<FindByCharacteristicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindByCharacteristicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindByCharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
