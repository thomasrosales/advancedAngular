import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor() { }

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
      console.log("Debe aceptar condiciones");
      return;
    }
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
  }

  equalsInput(field: string, fieldComparator: string){
    return (group: FormGroup)=>{

      let pass1 = group.controls[field].value;
      let pass2 = group.controls[fieldComparator].value;

      if(pass1 === pass2){
        return null;
      }
  
      return {
        equalsInput: true
      }
    };
  }

}