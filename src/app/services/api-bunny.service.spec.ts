import { TestBed } from '@angular/core/testing';

import { ApiBunnyService } from './api-bunny.service';

describe('ApiBunnyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiBunnyService = TestBed.get(ApiBunnyService);
    expect(service).toBeTruthy();
  });
});
