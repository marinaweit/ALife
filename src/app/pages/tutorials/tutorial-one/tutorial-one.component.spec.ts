import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialOneComponent } from './tutorial-one.component';

describe('TutorialOneComponent', () => {
  let component: TutorialOneComponent;
  let fixture: ComponentFixture<TutorialOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
