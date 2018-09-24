import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxNetworkXComponent} from './ngx-network-x.component';
import {HttpClientModule} from '@angular/common/http';

describe('NgxNetworkxComponent', () => {
    let component: NgxNetworkXComponent;
    let fixture: ComponentFixture<NgxNetworkXComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [NgxNetworkXComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxNetworkXComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
