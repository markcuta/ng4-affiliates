import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { RegistrationService } from './registration.service';
import { RegistrationValidators } from './registration.validators';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  showLoader: boolean = false;
  formError: string;

  form: FormGroup;
  days: {};
  months: {};
  years: {};

  constructor(private fb: FormBuilder, private _service: RegistrationService) { }

  ngOnInit() {
    //Init birthdate values
    this.days = Array.from(Array(31).keys()).map(x => x + 1);
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.years = this.populateYears();
    //Build form
    this._buildForm();
  }

  populateYears() {
    let yearsArr = [];
    let thisYear = new Date().getFullYear();
    for (var _i = thisYear; _i >= (thisYear - 99); _i--) {
      yearsArr.push(_i);
    }
    return yearsArr;
  }

  private _buildForm() {
    //Build form and validations
    this.form = this.fb.group({
      gender: ['', Validators.required],
      name: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]*$'),
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      email: ['', Validators.email, RegistrationValidators.emailNotTaken(this._service)],
      password: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$'),
        Validators.minLength(5),
        Validators.maxLength(35)
      ]],
      dob: this.fb.group({
        day: 0,
        month: 0,
        year: 0
      }, { validator: RegistrationValidators.validDOB })
    });
  }

  onSubmit() {
    this.showLoader = true;

    //Populate post data
    let user = {
      account: {
        email: this.email.value,
        password: this.password.value
      },
      profile: {
        first_name: this.name.value,
        sex: this.gender.value,
        birthday: `${this.year.value}-${this.month.value}-${this.day.value}`
      }
    };

    //Call POST
    this._service.post(user)
      .finally(() => this.showLoader = false)
      .subscribe(
      resp => {
        window.location.replace(resp.login_url);
      },
      (err) => {
        switch (err.status) {
          case 409:
            this.formError = "Email already exists";
            break;
          case 400:
            this.formError = "Make sure data is correct";
            break;
          case 500:
            this.formError = "Oops..something went wrong";
            break;
          default:
            this.formError = "Error !";
            break;
        }

        //Hide error message
        setTimeout(function () {
          this.formError = undefined;
        }.bind(this), 3000);
      });
  }

  //Form Getters
  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get dob() {
    return this.form.get('dob');
  }
  get gender() {
    return this.form.get('gender');
  }
  get day() {
    return this.form.get('dob').get('day');
  }
  get month() {
    return this.form.get('dob').get('month');
  }
  get year() {
    return this.form.get('dob').get('year');
  }
}