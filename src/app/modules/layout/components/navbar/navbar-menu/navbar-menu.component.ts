import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { NgFor, NgClass, ViewportScroller } from '@angular/common';
import { MenuItem } from '../../../../../core/models/menu.model';
import { RouterLink, Router, RouterModule } from '@angular/router';

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

  constructor(public menuService: MenuService, private router: Router, private viewportScroller: ViewportScroller) { }


  scrollTo(section: string) {

    //let elements: HTMLCollectionOf<HTMLElement> | null; 

    const elements = Array.from(document.getElementsByClassName('menu-item') as HTMLCollectionOf<HTMLElement>);
    const inicio = document.getElementsByClassName(section) as HTMLCollectionOf<HTMLElement>;

    //console.log(elements)
    elements.forEach((item, key) => {
      item.classList.remove('active')
    });
    inicio[0].classList.add('active')
    if (section === 'nosotros') {
      this.router.navigate(['/nosotros']).then(() => {
        this.viewportScroller.scrollToAnchor(section);
      });
    } else if (section === 'marketplace') {
      this.router.navigate(['/marketplace']).then(() => {
        this.viewportScroller.scrollToAnchor(section);
      });
    }
    else {
      this.router.navigate(['/home']).then(() => {
        this.viewportScroller.scrollToAnchor(section);
      });

    }

  }

  ngOnInit(): void { }

}
