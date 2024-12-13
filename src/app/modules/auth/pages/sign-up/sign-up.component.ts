import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, NgClass, NgIf, NgFor],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  currentStep = 1;
  totalSteps = 3;
  datosForm: any;
  errorMessage: any;

  constructor(private readonly fb: FormBuilder, private readonly _router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]], // Validación para un rango de dígitos
      //dpi: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirm: ['', Validators.required],
      terminos_condiciones: [false, Validators.requiredTrue],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  get f() {
    return this.form.controls;
  }

  get passwordGroup() {
    return this.form.get('passwordGroup') as FormGroup;
  }


  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('password_confirm')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Método para cambiar al siguiente paso
  nextStep() {
    if (this.currentStep < 3) { // Asume que hay 3 pasos
      this.currentStep++;
    } else {
      console.log('Todos los pasos completados.');
      // Opcional: redirigir o manejar la lógica final
      this._router.navigate(['/']);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.errorMessage = '';
    }
  }

  onSubmit() {
    this.submitted = true; // Marca el formulario como enviado para mostrar errores
    this.datosForm = this.form.value

    // Verifica si el formulario es inválido
    if (this.form.invalid) {
      console.log(this.datosForm)
      console.log('El formulario tiene errores.');
      return; // Detiene la ejecución si hay errores
    }
    // Si el formulario es válido, cambia al siguiente paso
    console.log('Formulario válido, avanzando al siguiente paso.');
    console.log(this.datosForm)
    this.nextStep();
  }

  OnSubmitRegistry() {
    const dataToSend = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      password: this.form.value.password
    };

    // Llamando al método `create`
    this.apiService.create(dataToSend, 'saveUser').subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente:', response);
        this.nextStep();
      },
      error: (err) => {
        console.error('Ocurrió un error:', err.message);
        this.errorMessage = err.message; 
        // Mostrar el error en la UI o tomar otras acciones,
      }
    });
  }
}
