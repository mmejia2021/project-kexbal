import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { ApiService } from '../../../../services/api.service';
import { DataTable, convertJSON } from "simple-datatables";

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [ NgClass, NgIf, NgFor],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent implements OnInit {
  
  ofertas: any[] = [];  // Aquí se guardan las ofertas obtenidas
  tableData: any[] = []; // Aquí se guardan los datos transformados para la tabla
  
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
        perPage: 6,
      });
      dataTable.insert(newData)

    });
  }

}
