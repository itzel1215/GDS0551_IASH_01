import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directives';
import { AuthService } from '../../services/auth.services';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; 

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    //private messageService: MessageService,
    private router: Router,
    private message: MessageService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required] 
    },{
        validators: passwordMatchValidator
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario de registro enviado:', this.registerForm.value);
    }
  }
  get fullName(){
    return this.registerForm.controls['fullName'];
  }

  get email(){
    return this.registerForm.controls['email'];
  }

  get password(){
    return this.registerForm.controls['password'];
  }

  get confirmPassword(){
    return this.registerForm.controls['confirmPassword'];
  }

  enviarRegistro(){
    const data = {...this.registerForm.value};

    delete data.confirmPassword;

    this.authService.registerUser(data as User).subscribe(
      response => {
        console.log(response);
        this.message.add({ severity: 'success', summary: 'Success',
          detail: 'Registrado Agregado'});
        this.router.navigate(['login']);
      },
      error => console.log(error)
    )
  }
}