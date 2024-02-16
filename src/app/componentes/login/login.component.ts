
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: [['',[Validators.required]]]
    
  })

  constructor(private fb: FormBuilder, private authService: AuthService,
    private messageSerivce: MessageService,
    private router: Router){

  }
  get email(){
    return this.loginForm.controls['email']
  }

  get password(){
    return this.loginForm.controls['password']
  }

  login(){
    const{email, password} = this.loginForm.value;
    const pass = this.loginForm.get('password')?.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if(response.length > 0 && response[0].password === String(pass)){
          sessionStorage.setItem('email', email as string);
          this.router.navigate(['/home']);
        }else{
          this.messageSerivce.add({severity: 'error', summary: 'Error', detail: 'Email o contraseña incorrectos 234'});
        }
      },
      error => {
        this.messageSerivce.add({severity: 'error', summary: 'Error', detail: 'Email o contraseña incorrectos'});
      }
    )
  }
}
