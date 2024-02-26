import { TestBed } from '@angular/core/testing';

import { ObjectsService } from './objects.service';
import { HttpClientModule } from '@angular/common/http';

describe('ObjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: ObjectsService = TestBed.get(ObjectsService);
    expect(service).toBeTruthy();
  });
});
