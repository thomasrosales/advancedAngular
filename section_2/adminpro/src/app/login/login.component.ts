import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user.models';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  rememberMe: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    init_plugins();
  }

  ingresar(loginForm: NgForm){
    console.log(loginForm);

    if(loginForm.invalid){
      return;
    }

    let user = new User(
      null,
      this.email,
      this.password
    );
    this.userService.login(user, this.rememberMe)
      .subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    //this.router.navigate(['/dashboard']);
  }

}
