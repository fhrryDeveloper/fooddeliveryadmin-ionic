import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { SetupAuthGuard } from './setupGuard/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin-dashboard',
        pathMatch: 'full'
      },

      {
        path: 'admin-dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      }, {
        path: 'basic',
        loadChildren: () => import('./components/basic/basic.module').then(m => m.BasicModule),
        canActivate: [AuthGuard]
      }, {
        path: 'notifications',
        loadChildren: () => import('./components/advance/notifications/notifications.module').then(m => m.NotificationsModule),
        canActivate: [AuthGuard]
      }, {
        path: 'forms',
        loadChildren: () => import('./components/forms/basic-elements/basic-elements.module').then(m => m.BasicElementsModule)
      }, {
        path: 'bootstrap-table',
        loadChildren: () => import('./components/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').
          then(m => m.BasicBootstrapModule),
      }, {
        path: 'map',
        loadChildren: () => import('./map/google-map/google-map.module').then(m => m.GoogleMapModule),
      }, {
        path: 'simple-page',
        loadChildren: () => import('./simple-page/simple-page.module').then(m => m.SimplePageModule)
      },
      {
        path: 'admin-restaurants',
        loadChildren: () => import('./restaurants/restaurants.module').then(m => m.RestaurantsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-drivers',
        loadChildren: () => import('./drivers/drivers.module').then(m => m.DriversModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-banners',
        loadChildren: () => import('./banners/banners.module').then(m => m.BannersModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
        canActivate: [AuthGuard]
      }, {
        path: 'admin-coupons',
        loadChildren: () => import('./coupons/coupons.module').then(m => m.CouponsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-rest-details',
        loadChildren: () => import('./restdetails/restdetails.module').then(m => m.RestdetailsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-new-coupon',
        loadChildren: () => import('./newcoupons/newcoupons.module').then(m => m.NewcouponsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-support',
        loadChildren: () => import('./supports/supports.module').then(m => m.SupportsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-chats',
        loadChildren: () => import('./chats/chats.module').then(m => m.ChatsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-newbanner',
        loadChildren: () => import('./newbanner/newbanner.module').then(m => m.NewbannerModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-newdriver',
        loadChildren: () => import('./newdriver/newdriver.module').then(m => m.NewdriverModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-userdetails',
        loadChildren: () => import('./userdetails/userdetails.module').then(m => m.UserdetailsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-orderdetails',
        loadChildren: () => import('./orderdetails/orderdetails.module').then(m => m.OrderdetailsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-cities',
        loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule),
        canActivate: [AuthGuard]
      }, {
        path: 'admin-newcities',
        loadChildren: () => import('./newcities/newcities.module').then(m => m.NewcitiesModule),
        canActivate: [AuthGuard]
      }, {
        path: 'admin-rest-stats',
        loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),
        canActivate: [AuthGuard]
      },
      //
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [SetupAuthGuard]
      }, {
        path: 'report',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'setup',
        loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
