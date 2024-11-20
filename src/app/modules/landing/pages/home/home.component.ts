import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgClass, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isShowTable = false;
  isShowCalculadora = true;
  form!: FormGroup;
  submitted = false;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      ofertaUsa: ['', [Validators.required]],
      tasaGt: ['', Validators.required],
    });
    
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
