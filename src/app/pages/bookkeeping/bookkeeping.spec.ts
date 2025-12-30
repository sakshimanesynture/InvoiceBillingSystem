import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookkeeping } from './bookkeeping';

describe('Bookkeeping', () => {
  let component: Bookkeeping;
  let fixture: ComponentFixture<Bookkeeping>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookkeeping]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookkeeping);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
