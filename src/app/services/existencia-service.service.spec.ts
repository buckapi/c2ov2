import { TestBed } from '@angular/core/testing';

import { ExistenciaServiceService } from './existencia-service.service';

describe('ExistenciaServiceService', () => {
  let service: ExistenciaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistenciaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
