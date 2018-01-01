import { TestBed, inject } from '@angular/core/testing';

import { MessagesHandlerService } from './messages-handler.service';

describe('MessagesHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagesHandlerService]
    });
  });

  it('should be created', inject([MessagesHandlerService], (service: MessagesHandlerService) => {
    expect(service).toBeTruthy();
  }));
});

