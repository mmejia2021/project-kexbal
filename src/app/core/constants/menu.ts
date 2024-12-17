import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Inicio',
      separator: false,
      route: '/kexbal/home',
      items: [],
      link: ''
    },
    {
      group: 'Comó funciona',
      separator: true,
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
        route: '/kexbal/nosotros',
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
        route: '/kexbal/marketplace',
        separator: true,
        items: [],
        link: ''
    },
   /* {
        group: 'Registrate',
        separator: true,
        items: [],
    },*/
  ];
}
