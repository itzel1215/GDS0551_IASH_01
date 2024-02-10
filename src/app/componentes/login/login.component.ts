
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: [['',[Validators.required, Validators]]]
    
  })

  constructor(private fb: FormBuilder){

  }
get email(){
  return this.loginForm.controls['email']
}

get password(){
  return this.loginForm.controls['password']
}
}
