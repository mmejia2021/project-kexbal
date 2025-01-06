import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { NgFor, NgClass } from '@angular/common';
import { MenuItem } from '../../../../../core/models/menu.model';
import { RouterLink , RouterModule} from '@angular/router';

@Component({
    selector: 'app-navbar-menu',
    templateUrl: './navbar-menu.component.html',
    styleUrls: ['./navbar-menu.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        NgClass,
        RouterLink,
        RouterModule
    ],
})
export class NavbarMenuComponent implements OnInit {

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

}
