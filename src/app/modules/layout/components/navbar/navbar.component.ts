import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        NavbarMenuComponent,
        RouterLink
    ],
})
export class NavbarComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    initFlowbite();
  }

}
