import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, NgFor],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  confirmPasswordTextType!: boolean;
  passwordsMatch = true;

  constructor(private readonly _formBuilder: FormBuilder, public apiService: ApiService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: this.matchPasswords('password', 'confirmPassword'), // Validación personalizada
      }
    );
  }

  // Método para validar si las contraseñas coinciden
  matchPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[passwordKey];
      const confirmPassword = formGroup.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mustMatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  togglePasswordconfirmTextType() {
    this.confirmPasswordTextType = !this.confirmPasswordTextType;
  }
  
  // Método para enviar el formulario
  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }



}
