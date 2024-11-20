import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        NavbarMenuComponent,
        NavbarMobileComponent,
        RouterLink
    ],
})
export class NavbarComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    initFlowbite();
  }


  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
