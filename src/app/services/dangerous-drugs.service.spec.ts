import { TestBed } from '@angular/core/testing';

import { DangerousDrugsService } from './dangerous-drugs.service';

describe('DangerousDrugsService', () => {
  let service: DangerousDrugsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangerousDrugsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
