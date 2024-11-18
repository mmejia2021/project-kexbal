import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Inicio',
      separator: false,
      route: '/kexbal/home',
      items: [],
    },
    {
      group: 'Comó funciona',
      separator: true,
      items: [],
    },
    {
      group: 'Preguntas',
      separator: false,
      items: [],
    },
    {
        group: 'Nosotros',
        separator: false,
        route: '/kexbal/nosotros',
        items: [],
    },
    {
        group: 'Contacto',
        separator: true,
        items: [],
    },
    /*{
        group: 'Inicia sesion',
       // route: '/auth/sign-in',
        separator: true,
        items: [],
    },
    {
        group: 'Registrate',
        separator: true,
        items: [],
    },*/
  ];
}
