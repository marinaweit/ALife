import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeTileComponent } from './welcome-tile.component';

describe('HeaderComponent', () => {
  let component: WelcomeTileComponent;
  let fixture: ComponentFixture<WelcomeTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeTileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
