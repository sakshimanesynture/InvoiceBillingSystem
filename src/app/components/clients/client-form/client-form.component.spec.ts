import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientFormComponent } from './client-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from '../../../services/client.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ClientFormComponent', () => {
  let component: ClientFormComponent;
  let fixture: ComponentFixture<ClientFormComponent>;

  const mockClientService = {
    getClientById: jasmine.createSpy('getClientById').and.returnValue(of(null)),
    createClient: jasmine.createSpy('createClient').and.returnValue(of({})),
    updateClient: jasmine.createSpy('updateClient').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientFormComponent,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ClientService, useValue: mockClientService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid initially', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('name & email required validation works', () => {
    const name = component.form.controls['name'];
    const email = component.form.controls['email'];

    name.setValue('');
    email.setValue('');

    expect(name.invalid).toBeTrue();
    expect(email.invalid).toBeTrue();
  });

  it('should validate GST format correctly', () => {
    const gst = component.form.controls['gstNumber'];

    gst.setValue('INVALID');
    expect(component.isGstValid()).toBeFalse();

    gst.setValue('27AABCU9603R1ZM');
    expect(component.isGstValid()).toBeTrue();
  });

  it('should call createClient() in add mode', () => {
    component.mode = 'add';
    component.form.patchValue({
      name: 'Test User',
      email: 'test@mail.com'
    });

    component.onSave();
    expect(mockClientService.createClient).toHaveBeenCalled();
  });
});
