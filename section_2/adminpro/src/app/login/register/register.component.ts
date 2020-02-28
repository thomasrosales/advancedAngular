import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.models';
import { Router } from '@angular/router';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private userSerive: UserService, private router: Router) { }

  ngOnInit(): void {
    init_plugins();
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, Validators.required),
      conditions: new FormControl(false),
    }, {validators: this.equalsInput('password', 'passwordConfirm')});
  }

  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }

    if(!this.registerForm.value.conditions){
      console.log('Debe aceptar condiciones');
      return;
    }

    let user = new User(
      this.registerForm.value.firstName,
      this.registerForm.value.email,
      this.registerForm.value.password
    );
    this.userSerive.userCreate(user).subscribe((response: User) => {
      Swal.fire({
        title: 'Welcome!',
        text: `Usuario creado: ${response.email}`,
        icon: 'success',
        confirmButtonText: 'Cool'
      }).then((result) => {
        if (result.value) {
            this.router.navigate(['/login']);
        }
      });
    }, (error) => {
      console.error(error);
      Swal.fire({
        title: ':(',
        text: `${error.error.errors.message}`,
        icon: 'error',
        confirmButtonText: 'Bad'
      });

    });

    // console.log(this.registerForm.value);
    // console.log(this.registerForm.valid);
  }

  equalsInput(field: string, fieldComparator: string) {
    return (group: FormGroup) => {

      let pass1 = group.controls[field].value;
      let pass2 = group.controls[fieldComparator].value;

      if(pass1 === pass2){
        return null;
      }
      return {
        equalsInput: true
      };
    };
  }
}
