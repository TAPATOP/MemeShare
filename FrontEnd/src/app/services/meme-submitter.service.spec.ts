import { TestBed } from '@angular/core/testing';

import { MemeSubmitterService } from './meme-submitter.service';

describe('MemeSubmitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemeSubmitterService = TestBed.get(MemeSubmitterService);
    expect(service).toBeTruthy();
  });
});
