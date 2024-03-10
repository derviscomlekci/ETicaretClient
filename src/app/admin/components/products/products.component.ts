import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Product } from '../../../contracts/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',

})
export class ProductsComponent extends BaseComponent implements OnInit{
  /**
   *
   */
  constructor(spinner:NgxSpinnerService,private httpClientservice:HttpClientService) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.Fire);


    this.httpClientservice.get<Product[]>({
      controller:"products"
    }).subscribe(data=>console.log(data))


    // this.httpClientservice.delete({
    //   controller:"products"
    // },"ece9853e-4c73-4647-95b5-1d1e368e8419").subscribe();

    // this.httpClientservice.put({
    //   controller:"products"
    // },{
    //   id:"20c352c3-9ff0-4424-9481-2b540cf54ed9",
    //   name:"Kalemlik",
    //   stock:101,
    //   price:18
    // }).subscribe();

    // this.httpClientservice.post({
    //   controller:"products"
    // },{
    //   name:"Kalem",
    //   stock:100,
    //   price:15
    // }).subscribe();

    // this.httpClientservice.post({
    //   controller:"products"
    // },{
    //   name:"Silgi",
    //   stock:1000,
    //   price:1
    // }).subscribe();

    // this.httpClientservice.post({
    //   controller:"products"
    // },{
    //   name:"Defter",
    //   stock:1,
    //   price:10
    // }).subscribe();

    // this.httpClientservice.post({
    //   controller:"products"
    // },{
    //   name:"Tebsir",
    //   stock:1200,
    //   price:120
    // }).subscribe();


  }

  

}
