import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstBilling } from './gst-billing';

describe('GstBilling', () => {
  let component: GstBilling;
  let fixture: ComponentFixture<GstBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GstBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstBilling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
