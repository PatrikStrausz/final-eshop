import { AdminComponent } from './components/admin/admin.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'product/:id', component: ProductComponent
      },
      {
        path: 'cart', component: CartComponent,canActivate:[AuthGuard]
      },
      {
        path: 'checkout', component: CheckoutComponent,canActivate:[AuthGuard],
      },
      {
        path: 'thankyou', component: ThanksComponent,canActivate:[AuthGuard]
      },
      {
        path: 'login', component: LoginComponent
      },
    
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]
      },
      {
        path: 'orders', component: MyOrdersComponent,canActivate:[AuthGuard]
      },
      {
        path: 'admin', component: AdminComponent,canActivate:[AuthGuard]
      }
    ]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
