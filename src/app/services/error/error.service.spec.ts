import { TestBed } from '@angular/core/testing';

import { MessageServie } from './error.service';

describe('ErrorService', () => {
  let service: MessageServie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageServie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
