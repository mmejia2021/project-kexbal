import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { ApiService } from '../../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { Router, RouterLink,NavigationEnd } from '@angular/router';
import { DataTable } from "simple-datatables";
declare var $: any;

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule,NgClass, NgIf, NgFor, RouterLink, CurrencyPipe, DatePipe, TitleCasePipe, NgxPaginationModule],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent implements OnInit {

  ofertas: any[] = [];  // Aquí se guardan las ofertas obtenidas
  tableData: any[] = []; // Aquí se guardan los datos transformados para la tabla
  form!: FormGroup;
  table: any;
  
  page: number = 1;
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;
  currentPage = 1;
  itemsPerPage = 8;
  totalItems: number = 0;
  resultado: number | null = 0.00;
  monto1: number | null = 0.00;
  monto2: number | null = 0.00;

  
  
  constructor(public apiService: ApiService, private readonly _formBuilder: FormBuilder,private router: Router, private currencyPipe: CurrencyPipe) { }


  
  ngOnInit(): void {
    initFlowbite();

    this.form = this._formBuilder.group({
      ofertaUsa: ['', [Validators.required]],
      tasaGt: ['', Validators.required],
    });
   
    this.apiService.get('publications').subscribe((data) => {
      // Transform JSON data into rows for the table
      this.ofertas = data.activeOffers
      this.totalItems = this.ofertas.length
      console.log(this.totalItems)   
      
      // Transformamos los datos a un formato adecuado para DataTable
      this.tableData = this.ofertas.map((item: any) => [
        item.id_seller.username,  // Primera columna: Usuario
        this.currencyPipe.transform(item.available_offer, 'USD', '$', '1.0-2'),     // Segunda columna: USD disponible
        this.currencyPipe.transform( item.kexbal_exchange_rate, 'USD', 'Q', '1.0-2'), // Tercera columna: Tasa de cambio
        "<div  class=\"text-purple-800 text-xs font-medium font-inter\"> <div class=\"bg-primary-color-100 p-2 rounded-md bank-box\">"+item.bank+"</div> </div>",                 // Cuarta columna: Banco
        `<a href="/auth/sign-in" class="inline-flex rounded-md px-3 py-2 text-xs font-medium border border-r-2"> Comprar</a>`
      ]);
      console.log(this.tableData); // Muestra el nuevo formato
      let newData = {
        headings: ["Heading 1", "Heading 2", "Heading 3", "Heading 4", "Heading 5"],
        data: this.tableData
    };
      console.log(newData)
      const dataTable = new DataTable("#myTable",{
        labels: {
          perPage: "registros por página", // Selector de registros por página
          noRows: "No se encontraron registros", // Mensaje cuando no hay datos
          info: "Mostrar {start} - {end} de {rows} registros", // Información de paginación
        },
        searchable: false,
        fixedHeight: true,
        perPage: 8,
      });
      dataTable.insert(newData)

    });

     // Escuchar cambios de ruta y re-inicializar Flowbite
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        initFlowbite();
      }
    });
  }

  
 

    // Calcular índice de inicio y fin
    getStartIndex(): number {
      return (this.page - 1) * this.itemsPerPage;
    }
  
    getEndIndex(): number {
      return Math.min(this.page * this.itemsPerPage, this.totalItems);
    }

  changePage(page: number) {
    this.currentPage = page;
  }

  calcularResultado() {
    this.monto1 = this.form.value.ofertaUsa || 0.00;
    this.monto2 = this.form.value.tasaGt || 0.00;

    const monto1 = this.form.value.ofertaUsa || 0.00;
    const monto2 = this.form.value.tasaGt || 0.00;

    this.resultado = monto1 * monto2; // Cambia esta lógica según lo que necesites calcular
  }


}
