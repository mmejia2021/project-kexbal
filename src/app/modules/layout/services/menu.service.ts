import { Injectable,  OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from '../../../core/constants/menu';
import { MenuItem, SubMenuItem } from '../../../core/models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnDestroy {
  
  private _pagesMenu = signal<MenuItem[]>([]);
  private _subscription = new Subscription();

  constructor(private router: Router) {
    /** Set dynamic menu */
    this._pagesMenu.set(Menu.pages);

    let sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /** Expand menu base on active route */
        this._pagesMenu().forEach((menu) => {
          let activeGroup = false;
          menu.active = activeGroup;
        });
      }
    });
    this._subscription.add(sub);
  }


  get pagesMenu() {
    return this._pagesMenu();
  }



  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}

