import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-create-edit-modal',
  templateUrl: './contact-create-edit-modal.component.html',
  styleUrls: ['./contact-create-edit-modal.component.css']
})
export class ContactCreateEditModalComponent implements OnInit {

  loggedUser: User;
  contactForm = this.fb.group({
    name: ['', Validators.required],
    lastName: [''],
    telephone: ['', Validators.required]
  });

  constructor(private dialogRef: MatDialogRef<ContactCreateEditModalComponent>,
              private fb: FormBuilder, private contactService: ContactService, private userService: UserService) {
    this.userService.loggedUser$.subscribe(user => this.loggedUser = user);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const name = this.contactForm.get('name').value;
      const lastName = this.contactForm.get('lastName').value;
      const telephone = this.contactForm.get('telephone').value;
      const newContact: Contact = { name, lastName, telephone };
      this.contactService.createContact(this.loggedUser._id, newContact)
        .subscribe({
          next: (contact) => {
            this.dialogRef.close(contact);
          }
        });
    }
  }
}
