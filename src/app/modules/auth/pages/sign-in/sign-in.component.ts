import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgClass, NgIf, NgFor],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  errorMessage: any;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const dataToSend = {
      email,
      password,
      gettoken: true
    };
    // Llamando al método `create`
    this.apiService.create(dataToSend, 'login').subscribe({
      next: (response) => {
        console.log('ingresa al  login', response);
        this.errorMessage = '';
        let secretKey = 'Myk3xb@lk3y';
        let queryString = CryptoJS.AES.encrypt(this.form.value.email + "|" + this.form.value.password, secretKey).toString();
       let url = 'https://linkdebashbaord.com/login?' + queryString
       console.log('Encrypted Text:', url);
      window.open(url, '_blank'); // '_blank' abre el enlace en una nueva pestaña
      },
      error: (err) => {
        console.error('usuario invalido:', err.message);
        this.errorMessage = err.message;
        // Mostrar el error en la UI o tomar otras acciones,
      }
    });
  }  
}
