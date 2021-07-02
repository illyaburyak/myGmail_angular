import {AbstractControl, FormGroup, Validator} from "@angular/forms";
import {Injectable} from "@angular/core";


@Injectable({providedIn: 'root'})

export class MatchPassword implements Validator {
  validate(formGroup: AbstractControl) {

    const {password, passwordConfirmation} = formGroup.value;

    if (password === passwordConfirmation) {
      return null
    } else {
      // any object we gonna return, gonna be assign to error property of formGroup or formControl
      return {
        passwordDontMatch: true
      }
    }
  }
}
