import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StateGraphComponent } from './state-graph-component.component';

describe('StateGraphComponentComponent', () => {
  let component: StateGraphComponent;
  let fixture: ComponentFixture<StateGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StateGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
