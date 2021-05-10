import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const newContact: Contact = { name: 'Test', lastName: 'Frontend', telephone: '123456789' };
    this.contactService.createContact(newContact)
      .subscribe(res => console.log(res));
  }

}
