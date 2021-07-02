import {Component, Injectable, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MatchPassword} from "../validators/match-password";
import {UniqueUserName} from "../validators/unique-user-name";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  authForm = new FormGroup({
      username: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ], [
          // @ts-ignore
          this.uniqueUserName.validate
        ]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    },
    // overall validation for all form
    {
      validators: [this.mathPassword.validate]
    })

  constructor(
    private mathPassword: MatchPassword,
    private uniqueUserName: UniqueUserName,
    private authService: AuthService
  ) {
  }


  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return
    }
    this.authService.signup(this.authForm.value).subscribe({
      next: (res) => {
        // Navigate to some other route
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({
            noConnection: true
          })
        } else {
          this.authForm.setErrors({unknownError: true})
        }
      }
    })
  }
}
