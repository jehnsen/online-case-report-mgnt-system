import { TestBed } from '@angular/core/testing';

import { CriminalDrugTestService } from './criminal-drug-test.service';

describe('CriminalDrugTestService', () => {
  let service: CriminalDrugTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriminalDrugTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
