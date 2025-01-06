import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Inicio',
      separator: false,
      route: 'home',
      items: [],
      link: ''
    },
    {
      group: 'Comó funciona',
      separator: false,
      items: [],
      link: ''
    },
    {
      group: 'Preguntas',
      separator: false,
      items: [],
      link: ''
    },
    { 
        group: 'Nosotros',
        separator: false,
        route: 'nosotros',
        items: [],
        link: ''
    },
    {
        group: 'Contacto',
        separator: true,
        items: [],
        link: ''
    },
    {
        group: 'Marketplace',
        route: 'marketplace',
        separator: true,
        items: [],
        link: ''
    }
  ];
}
