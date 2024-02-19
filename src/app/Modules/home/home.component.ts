import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './../../Services/User/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/Models/Interfaces/User/SignupUserRequest';
import { AuthRequest } from 'src/app/Models/Interfaces/User/auth/AuthRequest';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
loginCard = true;

loginForm = this.formBuilder.group({
  email: ['',Validators.required],
  password: ['',Validators.required],
});

signupForm = this.formBuilder.group({
  name: ['', Validators.required],
  email: ['', Validators.required],
  password: ['', Validators.required],
})

constructor(
  private formBuilder: FormBuilder,
  private UserService: UserService,
  private CookieService: CookieService,
  private MessageService: MessageService,
  private Router: Router
  ) { }

onSubmitLoginForm(): void {
  if (this.loginForm.value && this.loginForm.valid) {
    this.UserService.authUser(this.loginForm.value as AuthRequest)
    .subscribe({
      next: (response) => {
        if (response) {
this.CookieService.set('USER_INFO' , response?.token);

this.loginForm.reset();
this.Router.navigate(['/dashboard']);

this.MessageService.add({
  severity:'sucess' ,
  summary: 'Sucesso',
  detail: `Bem vindo de volta ${response?.name}!`,
  life: 2000,
})
        }
      },
      error: (err) => {
        this.MessageService.add({
          severity:'error' ,
          summary: 'Erro',
          detail: `Erro ao fazer login`,
          life: 2000,
        })
        console.log(err)}
    })
  }
}

onSubmitSignupForm(): void {
 if (this.signupForm.value && this.signupForm.valid) {
  this.UserService.signupUser(
    this.signupForm.value as SignupUserRequest)
    .subscribe({
      next: (response) => {
        if (response) {
        this.signupForm.reset();
        this.loginCard = true;
        this.MessageService.add({
          severity:'sucess' ,
          summary: 'Sucesso',
          detail: 'Usuário criado com sucesso!',
          life: 2000,
        })
      }
    },
    error: (err) => {
      this.MessageService.add({
        severity:'sucess' ,
        summary: 'Sucesso',
        detail: 'Erro ao criar usuário!',
        life: 2000,
      })
      console.log(err)}
    })
 }
}
}
