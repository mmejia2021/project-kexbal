import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { ApiService } from '../../../../services/api.service';
import { DataTable, convertJSON } from "simple-datatables";

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [ NgClass, NgIf, NgFor, CurrencyPipe, DatePipe, TitleCasePipe],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent implements OnInit {

  ofertas: any[] = [];  // Aquí se guardan las ofertas obtenidas
  tableData: any[] = []; // Aquí se guardan los datos transformados para la tabla

  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;
  currentPage = 1;
  itemsPerPage = 5;

  
  
  constructor(public apiService: ApiService) { }


  ngOnInit(): void {
   
    initFlowbite();

    this.apiService.get('publications').subscribe((data) => {
      // Transform JSON data into rows for the table
      this.ofertas = data.activeOffers

       // Transformamos los datos a un formato adecuado para DataTable
       this.tableData = this.ofertas.map((item: any) => [
        item.id_seller.username,  // Primera columna: Usuario
        item.available_offer,     // Segunda columna: USD disponible
        item.kexbal_exchange_rate, // Tercera columna: Tasa de cambio
        item.bank                 // Cuarta columna: Banco
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
  }

  get sortedData() {
    console.log('aqui ban las ofertas' +this.ofertas)
    let sorted = [...this.ofertas];

    if (this.sortedColumn) {
      sorted.sort((a, b) => {
        if (a[this.sortedColumn!] < b[this.sortedColumn!]) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (a[this.sortedColumn!] > b[this.sortedColumn!]) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sorted.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  sort(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
  }

  changePage(page: number) {
    this.currentPage = page;
  }

}
