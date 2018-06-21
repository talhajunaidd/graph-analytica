import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNetworkXComponent } from './ngx-network-x.component';

describe('NgxNetworkxComponent', () => {
  let component: NgxNetworkXComponent;
  let fixture: ComponentFixture<NgxNetworkXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNetworkXComponent ]
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
