import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {ToolbarComponent} from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatToolbarModule],
            declarations: [ToolbarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
