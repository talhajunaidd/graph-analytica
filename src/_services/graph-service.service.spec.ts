import { TestBed, inject } from '@angular/core/testing';

import { GraphService } from './graph.service';

describe('GraphServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphService]
    });
  });

  it('should be created', inject([GraphService], (service: GraphService) => {
    expect(service).toBeTruthy();
  }));
});
