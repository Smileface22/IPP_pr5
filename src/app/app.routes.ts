import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';


export const routes: Routes = [
    {
        path: '',
        component:ContactComponent,
    },
    {
        path: 'contacts',
        component:ContactComponent,
    },
    {
        path: 'contacts/add',
        component:ContactFormComponent,
    },
    {
        path: 'contacts/:id',
        component:ContactFormComponent,
    }
];