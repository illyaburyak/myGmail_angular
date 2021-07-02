import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {tap} from "rxjs/operators";


interface FormValues {
  username: string
  password: string
  passwordConfirmation: string
}

interface SignupResponse {
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';

  signedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  userNameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(`${this.rootUrl}/auth/username`, {
      username
    })
  }

  // formValues -> gonna pass values from a form
  signup(formValues: FormValues) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, formValues).pipe(
      tap(() => {
        this.signedIn$.next(true);
      })
    )
  }


}
