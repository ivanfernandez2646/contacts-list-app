import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCreateEditModalComponent } from './contact-create-edit-modal.component';

describe('ContactCreateEditModalComponent', () => {
  let component: ContactCreateEditModalComponent;
  let fixture: ComponentFixture<ContactCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCreateEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
