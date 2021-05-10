import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedUser: User;
  userContacts: Contact[];

  constructor(private contactService: ContactService, private userService: UserService) {
    this.userService.loggedUser$.subscribe(user => this.loggedUser = user);
  }

  ngOnInit(): void {
    // const newContact: Contact = { name: 'Test', lastName: 'Frontend', telephone: '123456789' };
    // this.contactService.createContact(this.loggedUser._id, newContact)
    //   .subscribe(res => console.log(res));
    this.contactService.getContactsByUserId(this.loggedUser._id)
      .subscribe(res => this.userContacts = res);
  }

}
