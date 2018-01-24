import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
//import { FormsModule, ReactiveFormsModule }   from '@angular/forms'; 

import { AppComponent } from './app.component';

import {RegistrationModule} from './components/registration/registration.module';

//import { RegistrationComponent } from './components/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent
    //,RegistrationComponent
  ],
  imports: [
    BrowserModule,
    RegistrationModule//,
    ,HttpModule
    //FormsModule,
    //ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
