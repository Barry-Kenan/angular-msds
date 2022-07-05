import { TestBed } from '@angular/core/testing';

import { PassportInterceptor } from './passport.interceptor';

describe('PassportInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PassportInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PassportInterceptor = TestBed.inject(PassportInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
