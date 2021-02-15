import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialTwoComponent } from './tutorial-two.component';

describe('TutorialTwoComponent', () => {
  let component: TutorialTwoComponent;
  let fixture: ComponentFixture<TutorialTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
