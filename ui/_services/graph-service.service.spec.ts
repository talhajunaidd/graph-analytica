import {inject, TestBed} from '@angular/core/testing';

import {GraphService} from './graph.service';
import {HttpClientModule} from '@angular/common/http';

describe('GraphServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GraphService],
            imports: [HttpClientModule]
        });
    });

    it('should be created', inject([GraphService], (service: GraphService) => {
        expect(service).toBeTruthy();
    }));
});
