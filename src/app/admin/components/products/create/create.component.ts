import { Create_Product } from './../../../../contracts/create_product';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessagePosition, MessageType } from '../../../../services/admin/alertify.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spiner: NgxSpinnerService, private productService:ProductService,private alertify:AlertifyService){
    super(spiner)
  }

  ngOnInit(): void {
  }

  @Output() createdProduct : EventEmitter<Create_Product>=new EventEmitter();
  @Output() uploadFileOptions: Partial<FileUploadOptions>={
    action:"upload",
    controller:"products",
    explanation:"Resimleri sürükleyin veya seçin...",
    isAdminPage:true,
    accept:".png, .jpeg, .jpg"
  }

  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallSpinClockwise);
    const create_product:Create_Product=new Create_Product();
    create_product.name=name.value;
    create_product.stock=parseInt(stock.value);
    create_product.price=parseFloat(price.value);

    this.productService.create(create_product,()=>{
      this.hideSpinner(SpinnerType.BallSpinClockwise)
      this.alertify.message("Ürün basarili bir sekilde eklendi.",{
        DismissOthers:true,
        MessageType:MessageType.Success,
        Position:MessagePosition.TopRight
      })
      this.createdProduct.emit(create_product);
    },errorMessage=>{
      this.hideSpinner(SpinnerType.BallSpinClockwise)
      this.alertify.message(errorMessage,{
      DismissOthers:true,
      MessageType:MessageType.Error,
      Position:MessagePosition.TopRight
    })}
      
    );
  }

  

}
