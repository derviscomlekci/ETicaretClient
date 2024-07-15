import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { ProductsModule } from './products/products.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BasketsModule,
    HomeModule,
    RouterModule,
    ProductsModule,
    RegisterModule,
  ]
})
export class ComponentsModule { }
