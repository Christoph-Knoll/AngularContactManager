import { Injectable } from '@angular/core';
import { IContact } from './contracts/contact';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  urlroot = 'http://localhost:3400/contacts'


  constructor(private httpClient: HttpClient) { }

  loadContacts(): Promise<IContact[]> {
    return this.httpClient.get<IContact[]>(this.urlroot).toPromise();
  }

  patchContact(contact: IContact) : Promise<IContact> {
    return this.httpClient.patch<IContact>(`${this.urlroot}/${contact.id}`, contact).toPromise<IContact>()
  }

  insertContact(contact: IContact) : Promise<IContact> {
    return this.httpClient.post<IContact>(`${this.urlroot}`, contact).toPromise<IContact>()
  }

  deleteContact(id: number) {
    this.httpClient.delete(`${this.urlroot}/${id}`).subscribe()
  }
}
