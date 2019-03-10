import { TestBed } from '@angular/core/testing';

import { FlavourQueryService } from './flavour-query.service';

describe('FlavourQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlavourQueryService = TestBed.get(FlavourQueryService);
    expect(service).toBeTruthy();
  });
});
