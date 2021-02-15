import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialThreeComponent } from './tutorial-three.component';

describe('TutorialThreeComponent', () => {
  let component: TutorialThreeComponent;
  let fixture: ComponentFixture<TutorialThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
