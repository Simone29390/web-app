import { TestBed, inject } from '@angular/core/testing';

import { ContainerViewService } from './container-view.service';

describe('ContainerViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContainerViewService]
    });
  });

  it('should be created', inject([ContainerViewService], (service: ContainerViewService) => {
    expect(service).toBeTruthy();
  }));
});
