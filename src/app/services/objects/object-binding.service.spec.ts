import { TestBed } from '@angular/core/testing';

import { ObjectBindingService } from './object-binding.service';

describe('ObjectBindingService', () => {
  let service: ObjectBindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectBindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
