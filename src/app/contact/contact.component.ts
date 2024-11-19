import { Component, inject } from '@angular/core';
import  Contact  from '../models/contact';
import { ContactService } from '../services/contact.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contacts: Contact[] = [];
  contactService = inject(ContactService);
  ngOnInit() {
    this.contactService.getContacts().subscribe(result =>{
      this.contacts = result
      console.log(this.contacts)
    });
  }

  deleteContact(id:string) {
    const ok = confirm("Are you sure you want to delete?");
    if (ok){
      this.contactService.deleteContact(id).subscribe(result => {
        alert("Contact deleted successfully");
        this.contacts = this.contacts.filter(contact => contact._id !== id);
      })
    }
  }
}
