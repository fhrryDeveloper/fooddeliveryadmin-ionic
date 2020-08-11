import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Main',
    main: [
      {
        state: 'admin-dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      },
      {
        state: 'admin-cities',
        name: 'Available Cities',
        type: 'link',
        icon: 'ti-location-pin'
      },
      {
        state: 'admin-restaurants',
        name: 'Restaurants',
        type: 'link',
        icon: 'ti-notepad'
      },
      {
        state: 'admin-users',
        name: 'Users',
        type: 'link',
        icon: 'ti-user'
      },
      {
        state: 'admin-drivers',
        name: 'Drivers',
        type: 'link',
        icon: 'ti-truck'
      },
      {
        state: 'admin-orders',
        name: 'Orders',
        type: 'link',
        icon: 'ti-shopping-cart'
      },
    ],
  },
  {
    label: 'Manage',
    main: [
      {
        state: 'admin-banners',
        name: 'Banners',
        type: 'link',
        icon: 'ti-layout-list-large-image',
      },
      {
        state: 'admin-coupons',
        name: 'Coupons',
        type: 'link',
        icon: 'ti-medall'
      },
      {
        state: 'admin-notification',
        name: 'Notification',
        type: 'link',
        icon: 'ti-bell'
      },
      {
        state: 'admin-chats',
        name: 'Support',
        type: 'link',
        icon: 'ti-comments-smiley'
      },
      {
        state: 'admin-rest-stats',
        name: 'Restaurant Stats',
        type: 'link',
        icon: 'ti-stats-up'
      }
    ]
  },
  // {
  //   label: 'Forms',
  //   main: [
  //     {
  //       state: 'forms',
  //       name: 'Form Components',
  //       type: 'link',
  //       icon: 'ti-layers'
  //     }
  //   ]
  // },
  // {
  //   label: 'Tables',
  //   main: [
  //     {
  //       state: 'bootstrap-table',
  //       name: 'Bootstrap Table',
  //       type: 'link',
  //       icon: 'ti-receipt'
  //     }
  //   ]
  // },
  // {
  //   label: 'Map',
  //   main: [
  //     {
  //       state: 'map',
  //       name: 'Maps',
  //       type: 'link',
  //       icon: 'ti-map-alt'
  //     }
  //   ]
  // },
  // {
  //   label: 'Pages',
  //   main: [
  //     {
  //       state: 'auth',
  //       short_label: 'A',
  //       name: 'Authentication',
  //       type: 'sub',
  //       icon: 'ti-id-badge',
  //       children: [
  //         {
  //           state: 'login',
  //           type: 'link',
  //           name: 'Login',
  //           target: true
  //         }, {
  //           state: 'registration',
  //           type: 'link',
  //           name: 'Registration',
  //           target: true
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   label: 'Other',
  //   main: [
  //     {
  //       state: '',
  //       name: 'Menu Levels',
  //       type: 'sub',
  //       icon: 'ti-direction-alt',
  //       children: [
  //         {
  //           state: '',
  //           name: 'Menu Level 2.1',
  //           target: true
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.2',
  //           type: 'sub',
  //           children: [
  //             {
  //               state: '',
  //               name: 'Menu Level 2.2.1',
  //               target: true
  //             },
  //             {
  //               state: '',
  //               name: 'Menu Level 2.2.2',
  //               target: true
  //             }
  //           ]
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.3',
  //           target: true
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.4',
  //           type: 'sub',
  //           children: [
  //             {
  //               state: '',
  //               name: 'Menu Level 2.4.1',
  //               target: true
  //             },
  //             {
  //               state: '',
  //               name: 'Menu Level 2.4.2',
  //               target: true
  //             }
  //           ]
  //         }
  //       ]
  //     }, {
  //       state: 'simple-page',
  //       name: 'Simple Page',
  //       type: 'link',
  //       icon: 'ti-layout-sidebar-left'
  //     }
  //   ]
  // }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
