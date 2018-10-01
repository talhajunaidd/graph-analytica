import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyLayoutComponent } from './cy-layout.component';

describe('CyLayoutComponent', () => {
  let component: CyLayoutComponent;
  let fixture: ComponentFixture<CyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
