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
      name: 'mvo-main',
      displayName: 'Information Maintenance',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      name: 'product-main',
      displayName: 'Product Management',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      name: 'order-main',
      displayName: 'Order Management',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
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
