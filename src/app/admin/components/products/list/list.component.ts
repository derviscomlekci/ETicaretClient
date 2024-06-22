import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessagePosition, MessageType } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';

declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productservice:ProductService,
    spinner:NgxSpinnerService,
    private alertiftService:AlertifyService,
    private dialogService:DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate','photos','edit','delete'];
  dataSource:MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  async getProducts(){
    this.showSpinner(SpinnerType.BallSpinClockwise);
    const allProducts:{totalCount:number;products:List_Product[]}=await this.productservice.read(this.paginator ? this.paginator.pageIndex:0,this.paginator ? this.paginator.pageSize:5,()=>this.hideSpinner(SpinnerType.BallSpinClockwise),errorMessage=>this.alertiftService.message(errorMessage,{
      DismissOthers:true,
      MessageType:MessageType.Error,
      Position:MessagePosition.TopRight
    }))
    this.dataSource =new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length=allProducts.totalCount;
  }

  addProductImages(id: string){
    this.dialogService.openDialog({
        componentType:SelectProductImageDialogComponent,
        data:id,
        options:{
          width:"1400px"
        }
    });
  }


  async pageChanged(){
    await this.getProducts();
  }
  

  async ngOnInit() {
    await this.getProducts();
  }



}


