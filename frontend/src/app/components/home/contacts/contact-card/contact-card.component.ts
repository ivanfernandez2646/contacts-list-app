import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { ContactCreateEditModalComponent } from '../contact-create-edit-modal/contact-create-edit-modal.component';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {
  @Input() contact: Contact;

  constructor(private contactService: ContactService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editContact(): void {
    this.contactService.getContactById(this.contact._id)
      .subscribe(res => {
        if (res) {
          this.dialog.open(ContactCreateEditModalComponent, {
            data: res
          });
        }
      });
  }

  deleteContact(): void {

  }
}
