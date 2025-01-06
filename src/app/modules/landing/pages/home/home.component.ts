import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf,  CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { ApiService } from '../../../../services/api.service';
import { ParallaxStandaloneDirective } from '@yoozly/ngx-parallax';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgClass, NgIf, NgFor,  CurrencyPipe, DatePipe, TitleCasePipe, ParallaxStandaloneDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isShowTable = false;
  isShowCalculadora = true;
  form!: FormGroup;
  submitted = false;
  ofertas: any;
  currentPage = 1; // Página actual
  itemsPerPage = 5; // Elementos por página (default)
  paginatedData = []; // Datos visibles en la página actual
  limit = 6; // Número máximo de elementos por página
  resultado: number | null = 0.00;
  monto1: number | null = 0.00;
  monto2: number | null = 0.00;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      ofertaUsa: ['', [Validators.required]],
      tasaGt: ['', Validators.required],
    });

    initFlowbite();

    setTimeout(() => {
      this.apiService.get('publications').subscribe(data => {
        this.ofertas = data.activeOffers.slice(0, 6)
        console.log(data.activeOffers);
      });

    }, 2000);

  }
  
  calcularResultado() {
    this.monto1 = this.form.value.ofertaUsa || 0.00;
    this.monto2 = this.form.value.tasaGt || 0.00;

    const monto1 = this.form.value.ofertaUsa || 0.00;
    const monto2 = this.form.value.tasaGt || 0.00;

    this.resultado = monto1 * monto2; // Cambia esta lógica según lo que necesites calcular
  }



  toggleDisplay() {
    this.isShowTable = false;
    this.isShowCalculadora = true;
  }
  toggleDisplayCalculate() {
    this.isShowTable = true;
    this.isShowCalculadora = false;
  }


}
