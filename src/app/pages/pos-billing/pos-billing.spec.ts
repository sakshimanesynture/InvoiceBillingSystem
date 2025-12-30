import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosBilling } from './pos-billing';

describe('PosBilling', () => {
  let component: PosBilling;
  let fixture: ComponentFixture<PosBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosBilling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
