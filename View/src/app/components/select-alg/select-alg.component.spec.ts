import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectALGComponent } from './select-alg.component';

describe('SelectALGComponent', () => {
  let component: SelectALGComponent;
  let fixture: ComponentFixture<SelectALGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectALGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectALGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
