import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNavigatorComponent } from './alert-navigator.component';

describe('AlertNavigatorComponent', () => {
  let component: AlertNavigatorComponent;
  let fixture: ComponentFixture<AlertNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertNavigatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
