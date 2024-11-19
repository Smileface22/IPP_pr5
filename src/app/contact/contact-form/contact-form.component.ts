import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import  Contact  from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  contactForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required], 
    email: ['', [Validators.required, Validators.email]], 
    phone: ''
  });

  contactService = inject(ContactService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  editContactId!: string;

  ngOnInit() {
    this.editContactId = this.route.snapshot.params['id'];
    if (this.editContactId) {
      this.contactService.getContact(this.editContactId).subscribe(result => {
        this.contactForm.patchValue(result);
      });
    }
  }

  addUser() {
    const model: Contact = this.contactForm.value;
    this.contactService.addContact(model).subscribe(() => {
      alert("User added successfully");
      this.router.navigateByUrl('/');
    });
  }

  editContact() {
    const model: Contact = this.contactForm.value;
    this.contactService.editContact(this.editContactId, model).subscribe(() => {
      alert("User updated successfully");
      this.router.navigateByUrl('/');
    });
  }
}
