import { TestBed } from '@angular/core/testing';

import { AuthReverseGuard } from './auth-reverse.guard';

describe('AuthReverseGuard', () => {
  let guard: AuthReverseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthReverseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
