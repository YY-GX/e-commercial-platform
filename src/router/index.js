import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'
import WalletAuthLayout from '../views/wallet/auth/AuthLayout'
import walletLayout from '../views/wallet/walletApp/walletLayout'

Vue.use(Router)

const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

const demoRoutes = [];

let router = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'login' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
        },
        {
          name: 'signup',
          path: 'signup',
          component: () => import('../components/auth/signup/Signup.vue'),
        },
        {
          name: 'recover-password',
          path: 'recover-password',
          component: () => import('../components/auth/recover-password/RecoverPassword.vue'),
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },
    {
      path: '/wallet_auth',
      component: WalletAuthLayout,
      children: [
        {
          name: 'wallet-login',
          path: 'wallet-login',
          component: () => import('../views/wallet/auth/login/Login.vue'),
        },
        {
          name: 'wallet-signup',
          path: 'wallet-signup',
          component: () => import('../views/wallet/auth/signup/Signup.vue'),
        },
        {
          name: 'wallet-recover-password',
          path: 'wallet-recover-password',
          component: () => import('../views/wallet/auth/recover-password/RecoverPassword.vue'),
        },
        {
          path: '',
          redirect: { name: 'wallet-login' },
        },
      ],
    },
    {
      path: '/wallet',
      component: walletLayout,
      children: [

        {
          name: 'wallet-bill',
          path: 'walletBill',
          component: () => import('../views/wallet/walletApp/walletBill'),
        },
        {
          name: 'wallet-pay',
          path: 'walletPay',
          component: () => import('../views/wallet/walletApp/walletPay'),
        },
        {
          name: 'not-found-simple',
          path: 'not-found-simple',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSimple.vue'),
        },
      ],
    },
    {
      path: '/404',
      component: EmptyParentComponent,
      children: [
        {
          name: 'not-found-advanced',
          path: 'not-found-advanced',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSearch.vue'),
        },
        {
          name: 'not-found-simple',
          path: 'not-found-simple',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSimple.vue'),
        },
        {
          name: 'not-found-custom',
          path: 'not-found-custom',
          component: () => import('../components/pages/404-pages/VaPageNotFoundCustom.vue'),
        },
        {
          name: 'not-found-large-text',
          path: '/pages/not-found-large-text',
          component: () => import('../components/pages/404-pages/VaPageNotFoundLargeText.vue'),
        },
      ],
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../components/dashboard/Dashboard.vue'),
          default: true,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        /*
           自己添加新的router
         */
        {
          name: 'BVO_info',
          path: 'BVO_info',
          component: () => import('../views/bvo/info-maintainance/BVO_main.vue'),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          name: 'BVO_store',
          path: 'BVO_store',
          component: () => import('../views/bvo/info-maintainance/BVO_store.vue'),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          name: 'BVO_product',
          path: 'BVO_product',
          component: EmptyParentComponent,
          children: [
            {
              name: 'BVO_shop',
              path: 'BVO_shop',
              component: () => import('../views/bvo/product-management/BVO_shop.vue'),
              meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              },
            },
            {
              name: 'BVO_wishlist',
              path: 'BVO_wishlist',
              component: () => import('../views/bvo/product-management/BVO_wishlist.vue'),
              meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              },
            }
          ]
        },
        {
          name: 'BVO_order',
          path: 'BVO_order',
          component: () => import('../views/bvo/order-management/BVO_order.vue'),
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          name: 'info-main',
          path: 'info',
          component: EmptyParentComponent,
          children: [
            {
              name: 'mvo-main',
              path: 'mvomain',
              component: () => import('../views/mvo/info-maintenance/mvoMain.vue'),
              meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              },
            },
            {
              name: 'brand-detail',
              path: 'branddetail',
              component: () => import('../views/mvo/info-maintenance/brandDetail.vue'),
              meta: {
                requireAuth: true,
              },
            },
            {
              name: 'company-detail',
              path: 'companydetail',
              component: () => import('../views/mvo/info-maintenance/companyDetail.vue'),
              meta: {
                requireAuth: true,
              },
            },
          ],
        },

        {
          name: 'order-main',
          path: 'order',
          component: () => import('../views/mvo/order-management/orderMain.vue'),
          default: true,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          name: 'product-main',
          path: 'product',
          component: () => import('../views/mvo/product-management/productMain.vue'),
          default: true,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          name: 'audit-wallet',
          path: 'auditWallet',
          component: () => import('../views/admin/audit_wallet'),
          default: true,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          name: 'dictionary',
          path: 'dictionary',
          component: () => import('../views/admin/dictionary'),
          default: true,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          name: 'authority_manage',
          path: 'authorityManage',
          component: () => import('../views/admin/authority_manage'),
          default: true,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          name: 'pages',
          path: 'pages',
          component: EmptyParentComponent,
          children: [
            {
              name: '404-pages',
              path: '404-pages',
              component: () => import('../components/pages/404-pages/404PagesPage'),
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.token) {  // 获取当前的token是否存在
      console.log("token存在");
      console.log("token is: " + localStorage.token);
      next();
    } else {
      console.log("token不存在");
      next({
        path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      })
    }
  }
  else { // 如果不需要权限校验，直接进入路由界面
    next();
  }
});


export default router;
