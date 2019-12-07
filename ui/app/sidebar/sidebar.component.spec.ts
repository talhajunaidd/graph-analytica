import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarComponent} from './sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatSidenavModule,
                BrowserAnimationsModule,
                NoopAnimationsModule],
            declarations: [SidebarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
