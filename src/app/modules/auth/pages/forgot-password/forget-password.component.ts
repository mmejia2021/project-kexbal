import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { ApiService } from '../../../../services/api.service'; 
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgClass, NgIf, NgFor],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  errorMessage: any;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router,public apiService: ApiService) { }
  
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.form.controls;
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (toast  && toastMessage) {
      toastMessage.textContent = message;

      // Cambiar colores según el tipo de mensaje
      if (type === 'success') {
        toast.classList.remove('hidden');
        toast.classList.add('bg-green-100', 'text-green-500');
        toast.classList.remove('bg-red-100', 'text-red-500');
      } else if (type === 'error') {
        toast.classList.remove('hidden');
        toast.classList.add('bg-red-100', 'text-red-500');
        toast.classList.remove('bg-green-100', 'text-green-500');
      }

      // Mostrar el toast por 3 segundos
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 3000);
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.apiService.create(this.form.value, 'forgotPassword').subscribe({
      next: (response) => {
        console.log('Se envio un link a tu correo', response);
        this.showToast(response.message, 'success');
      },
      error: (err) => {
        console.error('usuario invalido:', err.message);
        this.showToast(err.message, 'error');
        this.errorMessage = err.message;
      }
    });
    //this._router.navigate(['/']);
  }

}
