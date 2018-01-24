import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
// import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';


export class RegistrationValidators {
    static emailNotTaken(registrationService: RegistrationService) {
        return (control: AbstractControl) => {
            return Observable.timer(500).switchMap(() => {
                return registrationService.checkEmailNotTaken(control.value).map(res => {
                    return res ? null : { alreadyTaken: true };
                });
            });
        };
    }

    static validDOB(control: AbstractControl) {
        const day = control.get('day').value;
        const month = control.get('month').value;
        const year = control.get('year').value;

        if (day != 0 && month != 0 && year != 0)
            return RegistrationValidators._isOfAge(day, month, year) ? null : { notOfAge: true };
        else return { nonZero: true };
    }

    private static _isOfAge(day, month, year) {
        return new Date(+year + 18, +month - 1, +day) <= new Date();
    }
}