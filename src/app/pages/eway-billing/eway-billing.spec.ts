import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EwayBilling } from './eway-billing';

describe('EwayBilling', () => {
  let component: EwayBilling;
  let fixture: ComponentFixture<EwayBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EwayBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EwayBilling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
