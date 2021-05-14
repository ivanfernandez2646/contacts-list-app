import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    name: ['', [Validators.required, Validators.maxLength(15)]],
    lastName: ['', Validators.maxLength(20)],
    telephone: ['', Validators.required],
    img: ['']
  });

  constructor(private dialogRef: MatDialogRef<ContactCreateEditModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Contact,
              private fb: FormBuilder, private contactService: ContactService, private userService: UserService) {
    this.userService.loggedUser$.subscribe(user => this.loggedUser = user);
  }

  ngOnInit(): void {
    if (this.data) {
      this.contactForm.get('name')
        .setValue(this.data.name);
      this.contactForm.get('lastName')
        .setValue(this.data.lastName);
      this.contactForm.get('telephone')
        .setValue(this.data.telephone);
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const name = this.contactForm.get('name').value;
      const lastName = this.contactForm.get('lastName').value;
      const telephone = this.contactForm.get('telephone').value;
      const img = this.contactForm.get('img').value;

      if (this.data?._id) {
        const editedContact: Contact = { name, lastName, telephone, img };
        this.contactService.editContact(this.data._id, editedContact)
          .subscribe({
            next: (contact) => {
              this.dialogRef.close(contact);
            }
          });
      } else {
        const newContact: Contact = { name, lastName, telephone, img };
        this.contactService.createContact(this.loggedUser._id, newContact)
          .subscribe({
            next: (contact) => {
              this.dialogRef.close(contact);
            }
          });
      }

    }
  }

  changeFile(evt: Event): void {
    const element = evt.currentTarget as HTMLInputElement;
    const file: File = element.files.item(0);

    if (file.size > 3145728) {
      alert('File is bigger than 3MB');
      element.value = '';
    } else {
      this.contactForm.get('img')
        .setValue(file);
    }
  }

}
