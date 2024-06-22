import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { List_Product_Images } from '../../contracts/list_product_images';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatCard } from '@angular/material/card';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $:any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.css'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit  {

  constructor(dialogRef:MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productSevice:ProductService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService
  )
    {
    super(dialogRef)
  }

  images:List_Product_Images[];


  async ngOnInit() {
    this.spinner.show(SpinnerType.Fire);
    this.images=await this.productSevice.readImages(this.data as string,()=>this.spinner.hide(SpinnerType.Fire));
  }

  async deleteImagecomp(imageId: string,event:any) {
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      
      afterClosed: async()=>{
        this.spinner.show(SpinnerType.Fire);
        await this.productSevice.deleteImage(this.data as string, imageId, () => this.spinner.hide(SpinnerType.Fire));
        var card=$(event.srcElement).parent().parent();
        $(card).fadeOut(500);
      }
    })
   
  }


  @Output() options: Partial<FileUploadOptions>={
    accept:".png, .jpg, .jepg,. gif",
    action:"upload",
    controller:"products",
    explanation:"Select or drag product images here.",
    isAdminPage:true,
    querySting:`id=${this.data}`
  }

}

export enum SelectProductImageState{
  Close
}