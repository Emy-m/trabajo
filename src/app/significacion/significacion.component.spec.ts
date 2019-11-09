import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignificacionComponent } from './significacion.component';

describe('SignificacionComponent', () => {
  let component: SignificacionComponent;
  let fixture: ComponentFixture<SignificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
