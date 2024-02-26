import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { HttpClientModule } from '@angular/common/http';

describe('TokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: TokenService = TestBed.get(TokenService);
    expect(service).toBeTruthy();
  });
});
