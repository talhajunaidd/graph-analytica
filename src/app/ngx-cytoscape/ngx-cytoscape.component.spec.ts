import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCytoscapeComponent } from './ngx-cytoscape.component';

describe('NgxCytoscapeComponent', () => {
  let component: NgxCytoscapeComponent;
  let fixture: ComponentFixture<NgxCytoscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCytoscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCytoscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
