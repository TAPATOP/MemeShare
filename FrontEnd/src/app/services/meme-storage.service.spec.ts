import { TestBed } from '@angular/core/testing';

import { MemeStorageService } from './meme-storage.service';

describe('MemeStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemeStorageService = TestBed.get(MemeStorageService);
    expect(service).toBeTruthy();
  });
});
