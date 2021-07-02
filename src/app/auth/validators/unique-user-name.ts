import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, FormControl, FormGroup, ValidationErrors, Validator} from "@angular/forms";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable({providedIn: "root"})
export class UniqueUserName implements AsyncValidator {

  constructor(private authService: AuthService) {
  }


  // AbstractControl -> says that we gonna receive formControl or formGroup
  // @ts-ignore
  validate = (formControl: FormControl) => {
    const {value} = formControl

    return this.authService.userNameAvailable(value).pipe(
      map(value => {
        if (value.available) {
          return null;
        }
        return;
      }),
      catchError((err) => {
        if (err.error.username) {
          return of({nonUniqueUserName: true})
        } else {
          // of -> shortcut for creating a new observable
          return of({noConnection: true})
        }
      })
    )
  }
}
