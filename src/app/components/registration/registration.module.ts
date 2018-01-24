import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'; 

import { RegistrationComponent } from './registration.component';
import  { RegistrationService } from './registration.service';

@NgModule({
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule
  ],
  declarations: [RegistrationComponent],
  exports: [RegistrationComponent],
  providers: [RegistrationService]
})
export class RegistrationModule { }
