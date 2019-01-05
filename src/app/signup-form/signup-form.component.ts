import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(private authSerice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signUp() {
    const email = this.email;
    const displayName = this.displayName;
    const password = this.password;
    this.authSerice.signUp(email, password, displayName)
      .then(resolve => {
        this.router.navigate(['chat']);
      })
      .catch(error => this.errorMsg = error.message);
  }
}
