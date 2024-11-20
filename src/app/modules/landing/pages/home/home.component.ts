import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isShowTable = false;
  isShowCalculadora = true;

  ngOnInit(): void {
    initFlowbite();
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
