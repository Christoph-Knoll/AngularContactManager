import { Component, Type, OnInit } from '@angular/core';
import { IContact } from './contracts/contact';
import { ContactType } from './contracts/contact-type';
import { ContactApiService } from './contact-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Contact Manager';
  contacts: IContact[] = undefined
  editContact: IContact = undefined
  deleteContact: IContact = undefined

  contactType = ContactType
  typeSelectOptions = [];

  constructor(private contactService: ContactApiService) {
  }
  ngOnInit(): void {
    this.typeSelectOptions = Object.keys(this.contactType)
  }

  async onLoadContacts() {
    this.contacts = await this.contactService.loadContacts()
    console.log(this.contacts)
  }

  onEditContact(contact: IContact) {
    this.editContact = { id: contact.id, type: contact.type, name: contact.name, email: contact.email, address: contact.address}
    this.deleteContact = undefined
  }

  onDeleteContact(contact: IContact){
    this.deleteContact = contact
    this.editContact = undefined
  }

  onCreateContact(){
    this.editContact = { id: 0, type: ContactType.Private, name: "", email: "", address: ""}
    this.deleteContact = undefined
  }

  onCancel() {
    this.editContact = undefined
    this.deleteContact = undefined
  }

  async onSubmit() {
      if (this.deleteContact) {
        this.contactService.deleteContact(this.deleteContact.id)
      }
      else if (this.editContact) {
        if (this.editContact.id === 0) {
          await this.contactService.insertContact(this.editContact)
        } else {
          await this.contactService.patchContact(this.editContact)
        }
      }
      this.deleteContact = undefined
      this.editContact = undefined
      this.contacts = await this.contactService.loadContacts()
  }
}
