import { TestBed } from '@angular/core/testing';

import { IpClientService } from './ip-client.service';
import { HttpClientModule } from '@angular/common/http';

describe('IpClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: IpClientService = TestBed.get(IpClientService);
    expect(service).toBeTruthy();
  });
});
