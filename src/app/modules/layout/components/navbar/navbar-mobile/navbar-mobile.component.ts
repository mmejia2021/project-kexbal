import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [
    NgClass,
    NavbarMobileMenuComponent,
  ],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.css'
})
export class NavbarMobileComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}
    
    public toggleMobileMenu(): void {
      this.menuService.showMobileMenu = false;
    }
  }

