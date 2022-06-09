import { TestBed } from '@angular/core/testing';

import { DevopsServiceService } from './devops-service.service';

describe('DevopsServiceService', () => {
  let service: DevopsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevopsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
