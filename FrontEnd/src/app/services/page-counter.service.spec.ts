import { TestBed } from '@angular/core/testing';

import { PageCounterService } from './page-counter.service';

describe('PageCounterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageCounterService = TestBed.get(PageCounterService);
    expect(service).toBeTruthy();
  });
});
