export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      pid : 11,
      name: 'mvo-main',
      displayName: 'Information Maintenance',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      pid : 3,
      name: 'product-main',
      displayName: 'Product Management',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      pid : 4,
      name: 'order-main',
      displayName: 'Order Management',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      pid: 12,
      name: 'BVO_info',
      displayName: 'BVO_main',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      }
    },
    {
      pid: 6,
      name: 'BVO_shop',
      displayName: 'BVO_shop',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      }
    },
    {
      pid: 7,
      name: 'BVO_wishlist',
      displayName: 'BVO_wishlist',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      }
    },
    {
      pid: 9,
      name: 'BVO_order',
      displayName: 'BVO_order',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      }
    },
    {
      pid: 10,
      name: 'audit-wallet',
      displayName: 'wallet audit',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      }
    },
    {
      pid: 10,
      name: 'dictionary',
      displayName: 'data dictionary',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      }
    },
    {
      pid: 10,
      name: 'authority_manage',
      displayName: 'authority manage',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      }
    },
    // {
    //   name: 'statistics',
    //   displayName: 'menu.statistics',
    //   meta: {
    //     iconClass: 'vuestic-iconset vuestic-iconset-statistics',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'charts',
    //       displayName: 'menu.charts',
    //     },
    //     {
    //       name: 'progress-bars',
    //       displayName: 'menu.progressBars',
    //     },
    //   ],
    // },

    {
      name: 'pages',
      displayName: 'menu.pages',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-files',
      },
      disabled: true,
      children: [
        {
          name: 'login',
          displayName: 'Login/Signup',
        },
        {
          name: '404-pages',
          displayName: '404 Pages',
        },
      ],
    },
  ],
}
