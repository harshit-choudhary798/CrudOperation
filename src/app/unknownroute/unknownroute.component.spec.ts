import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownrouteComponent } from './unknownroute.component';

describe('UnknownrouteComponent', () => {
  let component: UnknownrouteComponent;
  let fixture: ComponentFixture<UnknownrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnknownrouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnknownrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
